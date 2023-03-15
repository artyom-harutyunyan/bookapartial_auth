import mailer from 'nodemailer'

class MailerService {

    server = mailer.createTransport({
            host: "smtp.transip.email",
            port: 465,
            auth: {
                user: "signup@bookpartials.com",
                pass: "Ankap2023=",
            },
            tls: {
                secureProtocol: "TLSv1_method"
            }
        });
    constructor() {
        this.server.transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        })
    }

    get sendActivationEmail () {
        return {
            subject: 'Bookpartials account activation',
            html: `<html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com"> 
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
                <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@500&display=swap" rel="stylesheet">
                <style>
                    * {
                        font-family: 'Inconsolata', monospace;
                    }

                    h1 {
                        margin-bottom: 10px;
                    }

                    .parent-link {
                        color: green;
                    }

                    div {
                        margin: 10px 0;
                    }

                </style>
            </head>
            <body>
                <h1>Congradulations!</h1>
                <p>Your <a href="https://app.bookpartials.com">bookpartials.com</a> account is <span>active</span> now<br/>
                <div>Please click the link below to login</div></br>
                <a class="parent-link" href="https://app.bookpartials.com">bookpartials.com</a>
                You can type the link into your browser as well.
            </body>
            </html>`
        }
    }

    sendEmail = async (email) => {
          const emailOptions = {
            from: 'signup@bookpartials.com',
            to: email,
            subject: this.sendActivationEmail.subject,
            html: this.sendActivationEmail.html
        }
        this.server.sendMail(emailOptions, (err, info) => {
            if (err) console.log(err)
            else console.log(info?.messageId)
        })
    }

    

}

export default new MailerService()
