from os import environ
import logging
import requests
import json
import logging
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import load_pem_public_key

logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = environ["ROLLUP_HTTP_SERVER_URL"]
logger.info(f"HTTP rollup_server url is {rollup_server}")
local_json_file_path = "mensages.json" 

def hex2str(hex):
    """
    Decodes a hex string into a regular string
    """
    return bytes.fromhex(hex[2:]).decode("utf-8")

def str2hex(str):
    """
    Encodes a string as a hex string
    """
    return "0x" + str.encode("utf-8").hex()

def verify_signature(public_key_pem, message, signature):
    # Load the public key from PEM format
    public_key = load_pem_public_key(public_key_pem)

    try:
        # Verify the signature using the public key
        public_key.verify(
            signature,
            message,
            padding.PKCS1v15(),
            hashes.SHA256()
        )
        return True
    except Exception as e:
        logger.error(f"Signature verification failed: {e}")
        return False

def handle_advance(data):
    logger.info(f"Received advance request data {data}")

    try:
        # Decode the payload from hex to string
        payload = hex2str(data['payload'])
        jsonInput = json.loads(payload)
        logger.info(f"Decoded payload: {jsonInput}")

        # Extract data from the decoded payload
        public_key_pem = jsonInput["public_key"].encode('utf-8')
        isRevogated = jsonInput["revogation"]
        raw_message = jsonInput["raw_message"].encode('utf-8')
        signature = bytes.fromhex(jsonInput["signed_message"])

        # Load the local JSON file
        with open(local_json_file_path, "r") as file:
            local_json_content = json.load(file)

        # Check if the public key is already revoked in the local JSON
        for entry in local_json_content:
            if entry["public_key"] == jsonInput["public_key"]:
                if entry["revogation"] == False:
                    logger.info(f"Public key {public_key_pem.decode('utf-8')} is already present and not revoked.")
                    return "reject"

        # If the message is marked as revoked, update the local JSON
        if isRevogated:
            updated = False
            for entry in local_json_content:
                if entry["public_key"] == public_key_pem.decode('utf-8'):
                    entry["revogation"] = False
                    updated = True
                    break
            
            # Save the updated local JSON content back to the file
            if updated:
                with open(local_json_file_path, "w") as file:
                    json.dump(local_json_content, file, indent=4)
                logger.info(f"Updated revogation status for public key {public_key_pem.decode('utf-8')}.")
            else:
                logger.info(f"No matching public key found to update revogation status.")
            
            hex_payload = str2hex(json.dumps(jsonInput))
            response = requests.post(rollup_server + "/report", json={"payload": hex_payload})
            logger.info(f"Sent report status {response.status_code}")
            return "accept"
        
        # Verifying the RSA signature based on the public key
        if verify_signature(public_key_pem, raw_message, signature):
            logger.info("Signature verification successful.")
            return "accept"
        else:
            logger.info("Signature verification failed.")
            return "reject"

    except Exception as e:
        logger.error(f"Failed to process advance request: {e}")
        return "reject"

def handle_inspect(data):
    logger.info(f"Received inspect request data {data}")
    logger.info("Adding report")

    # Read the contents of the localJson file
    try:
        with open(local_json_file_path, "r") as file:
            local_json_content = file.read()

        # Convert the file content to a hexadecimal string
        hex_payload = str2hex(str(json.dumps(local_json_content)))

        # Send the POST request with the hexadecimal payload
        response = requests.post(rollup_server + "/report", json={"payload": hex_payload})
        logger.info(f"Received report status {response.status_code}")
    except Exception as e:
        logger.error(f"Failed to handle inspect request: {e}")
        return "reject"

    return "accept"


handlers = {
    "advance_state": handle_advance,
    "inspect_state": handle_inspect,
}

finish = {"status": "accept"}

while True:
    logger.info("Sending finish")
    response = requests.post(rollup_server + "/finish", json=finish)
    logger.info(f"Received finish status {response.status_code}")
    if response.status_code == 202:
        logger.info("No pending rollup request, trying again")
    else:
        rollup_request = response.json()
        data = rollup_request["data"]
        handler = handlers[rollup_request["request_type"]]
        finish["status"] = handler(rollup_request["data"])
