from llmware.models import ModelCatalog

#   Step 1 - register your Ollama models in llmware ModelCatalog
#   -- these two lines will register: llama2 and mistral models
#   -- note: assumes that you have previously cached and installed both of these models with ollama locally

#   register llama2


#   register mistral - note: if you are using ollama defaults, then OK to register with ollama model name only
ModelCatalog().register_ollama_model(model_name="smollm")

model2 = ModelCatalog().load_model("smollm")


sentance = "i dont  like the played"

response = model2.inference(f"i will give you sentence  to check -  {sentance}  . find any eroor in this sentence if there is eroor it will give suggestion to fix it and some suggestion what did i done wrong ")
print("\nupdate: calling ollama mistral model ...")

print("update: example #2 - ollama mistral response - ", response)
