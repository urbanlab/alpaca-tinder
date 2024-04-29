import json
from pocketbase import PocketBase
#from pocketbase.models import Record

client = PocketBase('http://localhost:4002')

# Authenticate (update with actual credentials)
client.admins.auth_with_password("admin@admin.org", "changeme")

def create_dataset(name):
    """Create a new dataset record."""
    dataset = client.collection("datasets").create({"name": name})
    return dataset

def create_conversation(data, dataset_id):
    """Create a conversation record linked to the dataset."""
    conversation = client.collection("conversations").create({
        "data": data,
        "dataset": dataset_id
    })
    return conversation

def link_conversation_to_dataset(conversation_id, dataset_id):
    """Add the conversation ID to the dataset record."""
    client.collection("datasets").update(dataset_id, {"conversations+": [conversation_id]})

# Load JSON data
with open("test.json", "r") as file:
    questions = json.load(file)

# Create a dataset record
dataset = create_dataset("test")

print(dataset.id)
# Process each question in the JSON file
for question in questions:
    data = {"instruction": question["instruction"], "output": question["output"]}
    conversation = create_conversation(data, dataset.id)
    link_conversation_to_dataset(conversation.id, dataset.id)

print("All operations completed successfully.")
