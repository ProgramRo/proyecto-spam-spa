const nodemailer = require("nodemailer")

const enviar = (to, subject, html) => {
    return new Promise ((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "vamoaprobarmail07@gmail.com",
                pass: "_123456789!",
            },
        })
    
        let mailOptions = {
            from: "vamoaprobarmail07@gmail.com",
            to,
            subject,
            html,
        }
    
        transporter.sendMail(mailOptions, (err, data) => {
            if(err) {
                reject(err)
            } 
            if(data) {
                resolve(data)
            } 
        })
    })
}

// Se exporta el módulo
module.exports = enviar