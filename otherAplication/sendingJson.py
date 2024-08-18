import json
import base64
import requests

# File paths
cert_path = "my_certificate.crt"
message_path = "mensage.txt"
signature_path = "signature.sig"
output_json_path = "output.json"

# Server endpoint (replace with the actual URL)
server_url = "https://example.com/endpoint"

# Step 1: Read and encode the certificate file
with open(cert_path, "rb") as cert_file:
    cert_content = base64.b64encode(cert_file.read()).decode('utf-8')

# Step 2: Read and encode the message file
with open(message_path, "r") as message_file:
    message_content = message_file.read()

# Step 3: Read and encode the signature file
with open(signature_path, "rb") as signature_file:
    signature_content = base64.b64encode(signature_file.read()).decode('utf-8')

# Step 4: Create a dictionary to hold the encoded contents
data = {
    "certificate": cert_content,
    "message": message_content,
    "signature": signature_content
}

# Step 5: Write the dictionary to a JSON file
with open(output_json_path, "w") as output_file:
    json.dump(data, output_file, indent=4)

print(f"JSON file {output_json_path} has been created with the encoded contents.")

# Step 6: Send the JSON to the server
try:
    response = requests.post(server_url, json=data)
    
    # Check if the request was successful
    if response.status_code == 200:
        print("JSON data sent successfully.")
        print("Server Response:", response.json())
    else:
        print(f"Failed to send JSON data. Server responded with status code: {response.status_code}")
        print("Response:", response.text)
except requests.exceptions.RequestException as e:
    print(f"An error occurred while sending the JSON data: {e}")
