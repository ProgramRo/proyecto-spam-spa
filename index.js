// Se importa el módulo mailer
const enviar = require('./enviar')

// Se importa el módulo que consume la API
const getData = require('./getData')

const http = require('http')
const url = require('url')
const fs = require('fs')
const axios = require('axios')
const uuid = require('uuid')

http.createServer(async (req, res) => {
    let { correos, asunto, contenido } = url.parse(req.url, true).query

    if(req.url === '/') {
        res.setHeader('Content-Type', 'text/html')
        fs.readFile('index.html', 'utf-8', (err, data) => {
            res.end(data)
        })
    }

    if(req.url.startsWith('/mailing')) {
        const { uf, dolar, euro, utm } = await getData()
        const mensaje = contenido + `
        <p>El valor del dólar el día de hoy es: $${dolar}</p>
        <p>El valor del euro el día de hoy es: $${euro}</p>
        <p>El valor de la uf el día de hoy es: $${uf}</p>
        <p>El valor de la utm el día de hoy es: $${utm}</p>
        `
        enviar(correos.split(','), asunto, mensaje).then(() => {
            fs.writeFile(`${uuid.v4()}.txt`, `${correos.split(',')}\n ${asunto}\n ${mensaje}`, 'utf-8', () => {
                res.end('Se han enviado los correos exitosamente. Para confirmar, revise su bandeja de entrada.')
            })
        }).catch(() => {
            res.end('No se han podido enviar los correos. Verifique los datos e inténtelo nuevamente.')
        })
        
    }
}).listen(3000, () => console.log('Server ON Port 3000'))