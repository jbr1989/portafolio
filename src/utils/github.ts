

export async function getReadme(github_project: string) {
    const response = await fetch(`https://api.github.com/repos/jbr1989/${github_project}/readme`);
    if (response.status !== 200) {
        console.error(`Error al obtener el README de ${github_project}: ${response.status}`);
        return null;
    }

    const data = await response.json();
    // Decodifica Base64 a Uint8Array
    const binary = atob(data.content);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    // Decodifica a UTF-8
    return new TextDecoder('utf-8').decode(bytes);
}