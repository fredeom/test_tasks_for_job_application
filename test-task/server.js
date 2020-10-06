const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fetch = require('node-fetch');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/api/user/save') {
      //app.render(req, res, '/a', query)
      try {
        const result = await fetch('http://jsonplaceholder.typicode.com/posts', {
          method: 'post',
          body:    JSON.stringify(query),
          headers: { 'Content-Type': 'application/json', 'x-token-access': 'random' },
        });
        const text = await result.text();
        const data = JSON.parse(text);
        console.log(data);
        res.writeHead(200, {'Content-type' : "text/json"});
        res.end(JSON.stringify(query, null, 2));  
      } catch(e) {
        console.log(e);
      }
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
