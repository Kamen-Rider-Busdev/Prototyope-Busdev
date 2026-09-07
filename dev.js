import { watch } from "fs";

const PORT = Number(process.env.PORT) || 3000;
const clients = new Set();

let debounceTimer = null;
watch(".", { recursive: true }, (event, filename) => {
  if (!filename || filename.startsWith(".") || filename.includes("node_modules")) return;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const ext = filename.split(".").pop();
    for (const client of clients) {
      client(ext === "css" ? "css" : "reload");
    }
  }, 60);
});

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/__reload") {
      let send;
      const stream = new ReadableStream({
        start(controller) {
          send = (type) => {
            try {
              controller.enqueue(new TextEncoder().encode(`data: ${type}\n\n`));
            } catch {}
          };
          clients.add(send);
        },
        cancel() {
          clients.delete(send);
        }
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive"
        }
      });
    }

    const relPath = url.pathname === "/" ? "index.html" : "." + decodeURIComponent(url.pathname);
    let file = Bun.file(relPath);

    if (await file.exists()) {
      if (relPath.endsWith(".html")) {
        const html = await file.text();
        const injected = html.replace(
          "</body>",
          `<script>
            new EventSource("/__reload").onmessage = (e) => {
              if (e.data === "css") {
                document.querySelectorAll("link[rel=stylesheet]").forEach(l => {
                  const u = new URL(l.href);
                  u.searchParams.set("_r", Date.now());
                  l.href = u.toString();
                });
              } else {
                location.reload();
              }
            };
          </script></body>`
        );
        return new Response(injected, { headers: { "Content-Type": "text/html;charset=utf-8" } });
      }
      return new Response(file);
    }

    return new Response("Not Found", { status: 404 });
  }
});

console.log(`Server running at http://localhost:${server.port}`);
