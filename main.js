const FORCE_MAINTENANCE = false
const TIMEOUT_MS = 1000

const MAINTENANCE_HTML = `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Maintenance</title>
    <meta charset="utf-8"/>
    <style>
        html, body {
            height: 100%;
            margin: 0;
        }

        body {
            font-family: system-ui, sans-serif;
            background: lightgrey;
            color: black;

            display: flex;
            justify-content: center;  /* horizontal center */
            align-items: center;      /* vertical center */
            text-align: center;
        }

        h1 { font-size: 2rem; }
    </style>
    </head>
    <body>
        <div>
            <h1>We'll be back soon</h1>
            <p>The site is temporarily unavailable.</p>
        </div>
    </body>
    </html>
`.trim()

const MAINTENANCE_STATUS = 503
const MAINTENANCE_HEADERS = {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store',
}

export default {
    async fetch(request) {
        if (FORCE_MAINTENANCE) {
            return new Response(MAINTENANCE_HTML, {
                status: MAINTENANCE_STATUS,
                headers: MAINTENANCE_HEADERS,
            })
        }

        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
        try {
            const response = await fetch(request, {
                signal: controller.signal,
            })
            return response
        } catch (err) {
            console.error(err)
            return new Response(MAINTENANCE_HTML, {
                status: MAINTENANCE_STATUS,
                headers: MAINTENANCE_HEADERS,
            })
        } finally {
            clearTimeout(timeout)
        }
    },
}
