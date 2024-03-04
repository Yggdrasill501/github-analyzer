import requests
import os
import logging

MODULE_LOGGER =  logging.getLogger(__name__)

url = "https://github.com/Yggdrasill501/github-analyzer/blob/main/src/index.tsx"

def read_acces_token(file = '.env'):
    """Read github acces token if need.

    :param str file: file with enviromental variables.
    """
    try:
        with open(file, "r") as f:
            for line in f:
                if line.strip() and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    os.environ[key] = value

    except FileNotFoundError as error:
        MODULE_LOGGER.error(msg=f"Missing {file}, {error}")


def count_lines_in_github_file(owner, repo, path, access_token):
    """
    """
    if not access_token:
        access_token = read_acces_token()

    headers = {
        "Authorization": f"token {access_token}",
        "Accept": "application/vnd.github.v3.raw"
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        content = response.text
        lines = content.count('\n') + 1  # Counting new lines and adding one for the last line
        return lines
    else:
        return f"Error: {response.status_code} - {response.reason}"

# Example usage
owner = "octocat"
repo = "Hello-World"
path = "path/to/file.txt"
access_token = "YOUR_ACCESS_TOKEN"
print(count_lines_in_github_file(owner, repo, path, access_token))
