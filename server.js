const http = require('http')

const requestListener = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('X-Powered-By', 'NodeJS')
    res.statusCode = 200

    const { method, url } = req

    switch (url) {
        case '/':
            if (method == 'GET') {
                res.statusCode = 200
                res.end('<h1>Ini adalah homepage</h1>')
            } else {
                res.statusCode = 400
                res.end(`<h1>Halaman ini tidak dapat diakses dengan ${method} request!</h1>`)
            }
            break
        case '/about':
            if (method == 'GET') {
                res.statusCode = 200
                res.end('<h1>Ini adalah halaman about</h1>')
            } else if (method == 'POST') {
                let body = []

                req.on('data', (chunk) => {
                    body.push(chunk)
                })

                req.on('end', () => {
                    body = Buffer.concat(body).toString()
                    const {name} = JSON.parse(body)

                    res.statusCode = 200
                    res.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
                })
            } else {
                res.statusCode = 400
                res.end(`<h1>Halaman ini tidak dapat diakses dengan ${method} request!</h1>`)
            }
            break
        default:
            res.statusCode = 404
            res.end('<h1>Halaman tidak ditemukan</h1>')
    }

    // switch (method) {
    //     case "GET":
    //         res.end('<h1>Method GET</h1>')

    //         break
    //     case "POST":
    //         let body = []

    //         req.on('data', (chunk) => {
    //             body.push(chunk)
    //         })

    //         req.on('end', () => {
    //             body = Buffer.concat(body).toString()
    //             const { name } = JSON.parse(body);
    //             res.end(`<h1>Hai, ${name}!</h1>`)
    //         })

    //         break
    //     case "PUT":
    //         res.end('<h1>Method PUT</h1>')

    //         break
    //     case "DELETE":
    //         res.end('<h1>Method DELETE</h1>')

    //         break
    // }
}

const server = http.createServer(requestListener)

const port = 5000
const host = 'localhost'

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})