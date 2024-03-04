const url =
  "https://github.com/Yggdrasill501/github-analyzer/blob/main/src/index.tsx";

function readAccessToken(file: string = "../.env"): string | undefined {
  try {
    const data = Bun.file(file).text();
    const lines = data.split("\n");

    for (const line of lines) {
      if (line.trim() && !line.startsWith("#")) {
        const [key, value] = line.trim().split("=", 2);
        if (key === "ACCESS_TOKEN") return value;
      }
    }
  } catch (error) {}
}

async function countLinesInGithubFile(
  url: string,
): Promise<[number, string] | string> {
  const accessToken = readAccessToken();

  if (!accessToken) {
    return "Access token is undefined.";
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3.raw",
      },
    });

    if (response.status === 200) {
      const content = await response.text();
      const lines = content.split("\n").length;
      return [lines, content];
    } else {
      return `Error: ${response.status} - ${response.statusText}`;
    }
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}

countLinesInGithubFile(url).then((result) => {
  console.log(result);
});
