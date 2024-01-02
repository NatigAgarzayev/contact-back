import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

export const sendResetMail = (userId, userEmail) => {
    const token = jwt.sign(
        {
            id: userId
        }, 
        process.env.JWT_SECRET,
        {expiresIn: '5m'}
    )

    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "natigagharzayev2003@outlook.com",
            pass: "a3239015",
        },
    })
    
    const options = {
        from: "natigagharzayev2003@outlook.com",
        to: userEmail, //"contactservicebot@gmail.com"
        subject: "Reset Password!",
        text: "The link is active only 5 minutes!",
        html: `
            <h1>The link is active only 5 minutes!</h1>
            <a href='http://localhost:3000/reset/${token}'>Reset your password now!</a>
        `
    }

    transporter.sendMail(options, (err, info) => {
        if(err){
            console.log(err)
            return 
        }
        console.log("Sent: ", info.response)
    })
}