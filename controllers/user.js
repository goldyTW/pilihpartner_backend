import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";
import fs from 'fs'
import path from 'path'

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
  const { email, password, name, whatsapp, skills } = req.body;
  const sekil = skills.split(',');
  if(req.file){
        console.log(req.file)
        let tmp_path= req.file.path;
        let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = req.file.filename + '.' + originaExt;
        
        // let target_path = path.resolve(`public/uploads/${imageName}`)
        // let target_path = path.resolve(`../public/uploads/${filename}`)
        // let __dirname = tmp_path;
        // console.log(__dirname)
        // let tes = path.resolve(__dirname, '..');
        // console.log(tes)
        let target_path = path.resolve(`uploads/${filename}`)
        // console.log(target_path)


        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)

        src.pipe(dest)

        src.on('end', async ()=>{
          try {
            // const oldUser = await UserModal.findOne({ email });
            
            // if (oldUser) return res.status(404).json({ message: "User already exist! Please use another email" });
            
            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await UserModal.create({ email, password: hashedPassword, name, whatsapp, skills: sekil, img: target_path });

            const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

            res.status(201).json({ result, token });
          } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
            
            console.log(error);
          }
        })
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
        res.json({data:users})
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getSingleUser = async (req, res) => {
  const {id} = req.params
   try {
        const singleuser = await UserModal.findOne({ _id: id });
        res.json({data:singleuser})

    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, whatsapp, location, skill, education, portofolio } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = { name, whatsapp, location, skill, education, portofolio, _id: id };

    await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser);
}