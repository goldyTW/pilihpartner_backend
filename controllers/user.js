import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyLogin = async (req, res) => {
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
  // const { email, password, name, whatsapp, skills, imageName } = req.body;
  const { email, password, name, whatsapp, location, skills, imageName, education, portofolio, recommendation, endorse } = req.body;
  const sekil = skills.split(',');
  try {
    // const oldUser = await UserModal.findOne({ email });
    
    // if (oldUser) return res.status(404).json({ message: "User already exist! Please use another email" });
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name, whatsapp, skills: sekil, img: imageName});

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

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
          users2.push( {email:element.email, name:element.name, location:element.location, whatsapp:element.whatsapp, education:element.education, img:element.img, skills:element.skills, _id:element._id})
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
        res.json({data: {email:user.email, name:user.name, location:user.location, whatsapp:user.whatsapp, education:user.education, portofolio:user.portofolio,
          img:user.img, skills:user.skills, id:user.id, endorse:user.endorse, recommendation:user.recommendation, _id:user.id}})

    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, whatsapp, location, skills, img, education, portofolio, recommendation, endorse } = req.body;
    
    const oldUser = await UserModal.findOne({ _id: id });

    if (!oldUser) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = { name, whatsapp, location, skills, education, img, portofolio, recommendation, endorse, _id: id };

    const result = await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });

    res.status(200).json(result);
}