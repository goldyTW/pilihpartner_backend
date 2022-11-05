import { rejects } from 'assert';
import Nodemailer from 'nodemailer';
// const url = 'http://localhost:5000'
let url = "https://pilihpartner.herokuapp.com";

function mailerOffer({toUser}) {
    const transporter = Nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'pilihpartner@gmail.com',
            pass: 'gdaezfmbzvxjjffn'
        }
    })
    const message ={
        from: 'pilihpartner@gmail.com',
        to: toUser.email,
        subject:"Pilih Partner - New Project Offer to You!",
        html:`
            <div style="text-align:center">
                <img src="https://cloud.squidex.io/api/assets/pilihpartner/f6ed74f0-e9b6-4c17-9c91-b817cb9e5063/pilih-partner.png" width="100px"/>
            </div>
            <h3>Hello ${toUser.name}</h3>
            <p>You have a new project offer, please response it from our website</p>
            <p></p>
            <p>Cheers,</p>
            <p>PilihPartner.id</p>`
    }
  return (
   transporter.sendMail(message, function(err, info){
    if (err){
        rejects(err)
    }else{
        res(info)
    }
   })
  )
}

export default mailerOffer