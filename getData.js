const axios = require('axios').default

const getData = async () => {
    try {
        let { data } = await axios.get('https://mindicador.cl/api')
        
        const uf = data.uf.valor
        const dolar = data.dolar.valor
        const euro = data.euro.valor
        const utm = data.utm.valor
        
        return { uf, dolar, euro, utm }
    } catch (err) {
        console.log(err)
    }
}

module.exports = getData