import { rejects } from 'assert';
import Nodemailer from 'nodemailer';
// const url = 'http://localhost:5000'
let url = "https://pilihpartner.herokuapp.com";

function mailer({toUser, _id}) {
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
        subject:"Pilih Partner - Activate Account",
        html:`
            <h3>Hello ${toUser.name}</h3>
            <p>Thank you for registering into our application. Just one more step</p>
            <p>To activate your acoount please follow this link: <a target="_" href="${url+'/user/activate/'+_id}">Activate</a></p>
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

export default mailer