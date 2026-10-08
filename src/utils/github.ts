

export async function getReadme(github_project: string): Promise<string | null> {
  const url = `https://api.github.com/repos/jbr1989/${github_project}/readme`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Astro-Portfolio-Build",
  };

  const token = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(url, {
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status !== 200) {
      console.warn(`[github] No se pudo obtener README de ${github_project} (HTTP ${response.status})`);
      return null;
    }

    const data = await response.json();
    if (!data?.content) return null;

    let decoded: string;
    if (typeof atob === "function") {
      decoded = atob(data.content);
    } else {
      decoded = Buffer.from(data.content, "base64").toString("binary");
    }

    const bytes = Uint8Array.from(decoded, (c) => c.charCodeAt(0));
    return new TextDecoder("utf-8").decode(bytes);
  } catch (error) {
    console.warn(`[github] Error de red o timeout obteniendo README de ${github_project}:`, error instanceof Error ? error.message : error);
    return null;
  }
}