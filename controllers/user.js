import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";
import mailChangePass from "./mailChangePass.js";
import mailer from "./mailer.js";

const secret = 'test';
// const url = 'http://localhost:3000';
let url = "https://pilihpartner.netlify.app";

export const verifyGoogle = async (req, res) => {
  const { email } = req.body;
  
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(200).json({ message: "user exist" });
    
    res.status(201).json({ message: "User not exist" });
    
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const signinGoogle = async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const isActivated = await UserModal.findOne({ email, activated:true });

    if(!isActivated) return res.status(405).json({message: "Please Activate your email first!"})

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const checkEmail = async (req, res) => {
   const { email } = req.body;
   try{
     const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(201)
    
    mailChangePass({toUser: oldUser, _id:oldUser._id})
    return res.status(200).json({ message: "success" });;

   }catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const verifySignUp = async (req, res) => {
  const { email } = req.body;
  
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(404).json({ message: "User already exist! Please use another email" });

    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const signup = async (req, res) => {
  const { email, password, name, whatsapp, location, skills, imageName, education, portofolio, recommendation, 
    endorse, mbti, connnection, currentPosition } = req.body;
  const sekil = skills.split(',');
  try {
   const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name, whatsapp, location, education, portofolio, 
      currentPosition, recommendation, endorse, skills: sekil, img: imageName, activated:false, mbti, connnection});

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    mailer({toUser: result, _id:result._id})
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signupGoogle = async (req, res) => {
  const { email, password, name, whatsapp, location, skills, imageName, education, portofolio, recommendation, 
    endorse, mbti, connnection, currentPosition } = req.body;
  const sekil = skills.split(',');
  try {
   const hashedPassword = await bcrypt.hash('vf5PwQtFQsn8uRr7', 12);

    const result = await UserModal.create({ email, password:hashedPassword, name, whatsapp, location, education, portofolio, 
      currentPosition, recommendation, endorse, skills:sekil, img: imageName, activated:true, mbti, connnection});

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const userActivate = async (req, res) =>{
  const {id} = req.params;
  try{
    const user = await UserModal.findOne({_id: id});
    if(!user) return res.status(422).send('User Cannot be Activated!');
    
    const update = {activated: true}
    const result = await UserModal.findByIdAndUpdate(id, update,{new:true} )
    res.redirect(url+'/activated');

  } 
  catch(error){
   res.status(500).json({ message: "Something went wrong" });
   console.log(error)
  }
}

export const resetPassword = async (req, res) =>{
  const {id} = req.params;
  try{
    const user = await UserModal.findOne({_id: id});
    if(!user) return res.status(422).send('User Cannot be Activated!');
    
    res.redirect(url+'/change-password/'+id);

  } 
  catch(error){
   res.status(500).json({ message: "Something went wrong" });
   console.log(error)
  }
}


export const getUsers = async (req, res) => {
    // const { page } = req.query;
    
    try {
        // const LIMIT = 9;
        // const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        // const total = await UserModal.countDocuments({});
        // const users = await UserModal.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        // res.json({ data: users, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});

        const users = await UserModal.find();
        let users2 = [];
        users.forEach(element => {
          users2.push( {email:element.email, name:element.name, location:element.location, whatsapp:element.whatsapp, recommendation:element.recommendation,
            education:element.education, img:element.img, skills:element.skills, _id:element._id, connection:element.connection, activated:element.activated})
        })
        res.json({data: users2})
       
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getSingleUser = async (req, res) => {
  const {id} = req.params
   try {
        const user = await UserModal.findOne({ _id: id });
        res.json({data: {email:user.email, name:user.name, location:user.location, whatsapp:user.whatsapp, education:user.education, 
          portofolio:user.portofolio, img:user.img, skills:user.skills, id:user.id, endorse:user.endorse, connection:user.connection,
          linkedin:user.linkedin, instagram:user.instagram, twitter:user.twitter, recommendation:user.recommendation, 
          currentPosition:user.currentPosition, mbti:user.mbti, _id:user.id}})
        
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, whatsapp, location, skills, img, education, portofolio, recommendation, endorse, twitter, linkedin, instagram,
      password, mbti, connection, currentPosition} = req.body;

    console.log(req.body)
    
    const oldUser = await UserModal.findOne({ _id: id });

    if (!oldUser) return res.status(404).send(`No user with id: ${id}`);

    let hashedPassword;
    if(password) {hashedPassword = await bcrypt.hash(password, 12);} 

    const updatedUser = { name, whatsapp, password:hashedPassword, location, skills, education, img, portofolio, twitter, linkedin, instagram,
      currentPosition, recommendation, endorse, mbti, connection, _id: id };

    const result = await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });

    res.status(200).json(result);
}