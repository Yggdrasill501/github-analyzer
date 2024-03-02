const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("How many lines of code did write ?🤔")
  },
});

console.log(`Listenning on localhost:${server.port}`)
