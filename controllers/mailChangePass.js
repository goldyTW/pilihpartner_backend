import { rejects } from 'assert';
import Nodemailer from 'nodemailer';

// const url = 'http://localhost:5000'
let url = "https://pilihpartner.herokuapp.com";

function mailChangePass({toUser, _id}) {
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
        subject:"Pilih Partner - Change Password",
        html:`
            <h3>Hello ${toUser.name}</h3>
            <p>please follow this link to reset your password: <a target="_" href="${url+'/user/resetpassword/'+_id}">Reset Password</a></p>
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

export default mailChangePass