import os
import re
from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from llmware.prompts import Prompt
from llmware.setup import Setup
from llmware.configs import LLMWareConfig
from llmware.retrieval import Query
from llmware.library import Library

router = APIRouter()

# Load environment variables
LLMWareConfig().set_active_db("sqlite")

# Path for saving uploaded PDFs
UPLOAD_DIR = "uploaded_pdfs"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/process-pdf")
async def process_pdf(file: UploadFile = File(...), question: str = ""):
    """API to upload a PDF file, process it, and return an answer to the given question"""
    try:
        # Save the uploaded PDF to disk
        pdf_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(pdf_path, "wb") as f:
            f.write(await file.read())

        # Initialize the library
        contracts_lib = Library().create_new_library("example4_library")

        # Add the file directly, or make sure to handle it as a directory if necessary
        contracts_lib.add_files(UPLOAD_DIR)  # Passing the directory where the file is saved

        # Initialize the query object
        q = Query(contracts_lib)

        # Get a list of document IDs
        doc_list = q.list_doc_id()

        # Load the model for prompt generation
        model_name = "llmware/bling-tiny-llama-v0"
        prompter = Prompt().load_model(model_name)

        # Prepare the query for RAG processing
        results = []

        for i, doc_id in enumerate(doc_list):
            doc_name = q.get_doc_fn(doc_id)
            print(f"\nAnalyzing contract {i + 1}: {doc_name} ({doc_id})")

            # Use the input question directly
            query_topic = question  # Use the provided question
            llm_question = question

            # Query the document using the topic
            doc_filter = {"doc_ID": [doc_id]}
            query_results = q.text_query_with_document_filter(query_topic, doc_filter, result_count=5, exact_mode=True)

            # Add source results to the prompt
            source = prompter.add_source_query_results(query_results)

            # Run the LLM with the query results as context
            responses = prompter.prompt_with_source(llm_question, prompt_name="default_with_context", temperature=0.3)

            # Collect responses
            for r, response in enumerate(responses):
                results.append({
                    "question": llm_question,
                    "response": re.sub("[\n]", " ", response["llm_response"]).strip()
                })

            prompter.clear_source_materials()

        return JSONResponse(content={"results": results}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process PDF: {str(e)}")
