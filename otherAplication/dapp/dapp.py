from os import environ
import logging
import requests
import json
import logging

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

def handle_advance(data):
    logger.info(f"Received advance request data {data}")

    try:
        # Decode the payload from hex to string
        payload = hex2str(data['payload'])
        jsonInput = json.loads(payload)
        logger.info(f"Decoded payload: {payload}")

        # Load the local JSON file
        local_json_file_path = local_json_file_path
        with open(local_json_file_path, "r") as file:
            local_json_content = json.load(file)

        for i in range(len(local_json_content)):
            if local_json_content[i]["public_key"] == jsonInput["public_key"]:
                if local_json_content[i]["revogation"] == False:
                    return "reject"

    except Exception as e:
        logger.error(f"Failed to process advance request: {e}")
        return "reject"

    return "accept"

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
