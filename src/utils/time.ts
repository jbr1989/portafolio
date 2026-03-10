// Fecha generada en el momento del build
export const buildTime: string = new Date().toISOString();

export function iso8601ToHumanTime(isoDuration: string): string {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const match = isoDuration.match(regex);
  
    if (!match) {
      throw new Error(`Duración ISO8601 no válida: ${isoDuration}`);
    }
  
    const [, h = "0", m = "0", s = "0"] = match;
  
    const hours = parseInt(h, 10);
    const minutes = parseInt(m, 10);
    const seconds = parseInt(s, 10);
  
    const pad = (n: number) => String(n).padStart(2, '0');
  
    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
      return `${pad(minutes)}:${pad(seconds)}`;
    }
  }