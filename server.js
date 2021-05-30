const http = require('http')

const requestListener = (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.statusCode = 200

    const { method } = req

    switch (method) {
        case "GET":
            res.end('<h1>Method GET</h1>')

            break
        case "POST":
            let body = []

            req.on('data', (chunk) => {
                body.push(chunk)
            })

            req.on('end', () => {
                body = Buffer.concat(body).toString()
                const { name } = JSON.parse(body);
                res.end(`<h1>Hai, ${name}!</h1>`)
            })

            break
        case "PUT":
            res.end('<h1>Method PUT</h1>')

            break
        case "DELETE":
            res.end('<h1>Method DELETE</h1>')

            break
    }
}

const server = http.createServer(requestListener)

const port = 5000
const host = 'localhost'

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})