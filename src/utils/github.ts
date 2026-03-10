

export async function getReadme(github_project: string) {
    const url = `https://api.github.com/repos/jbr1989/${github_project}/readme`;
    const response = await fetch(url);
    if (response.status !== 200) {
        console.log("URL: ", url);
        console.error(`Error al obtener el README de ${github_project}: ${response.status}`);
        return null;
    }

    const data = await response.json();

    // Decodifica Base64 de forma compatible (Node + navegador)
    let decoded: string;
    if (typeof atob === "function") {
        decoded = atob(data.content);
    } else {
        decoded = Buffer.from(data.content, "base64").toString("binary");
    }

    const bytes = Uint8Array.from(decoded, (c) => c.charCodeAt(0));
    return new TextDecoder("utf-8").decode(bytes);
}