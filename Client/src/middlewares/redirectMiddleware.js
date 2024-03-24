// Middleware para manejar la salida de la plataforma
export async function handleExternalLink(next, url) {
    try {
        const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
        next({
            name: 'LinkSaliente',
            query: { url }
        });
    } catch (error) {
        console.log("Error or CORS issue, redirecting anyway:", error.message);
        next({
            name: 'LinkSaliente',
            query: { url }
        });
    }
}
