from fastapi import FastAPI
from routers.teacher import teacher_router
from routers.student import student_router
from routers.carrier_guidance import carrier_guidance_router
from routers.job_ai import job_recommendation_router
from routers.resume import process_resume
from routers.rag import router
from routers.image_search import router as search_image
from routers.writing_assistant import router as writing_assistant_router
from cors import add_cors  # Import the CORS configuration

app = FastAPI()

# Apply CORS settings
add_cors(app)

# Include the routers
app.include_router(teacher_router, prefix="/teacher", tags=["Teacher"])
app.include_router(student_router, prefix="/student", tags=["Student"])
app.include_router(carrier_guidance_router, prefix="/carrier_guidance", tags=["Carrier Guidance"])
app.include_router(process_resume , prefix="/process_carrier_guidance", tags=["Process Carrier Guidance"])
app.include_router(job_recommendation_router, prefix="/job_recommendation", tags=["Job Recommendation"])
app.include_router(router, prefix="/rag", tags=["RAG"])
app.include_router(search_image, prefix="/search-image", tags=["Search Image"])
app.include_router(writing_assistant_router, prefix="/writing_assistant", tags=["Writing Assistant"])
