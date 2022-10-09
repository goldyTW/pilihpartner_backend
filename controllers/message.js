import Message from "../models/message.js";

export const createMessage = async (req, res) => {
  const { user, room, time, text } = req.body;

  try {
    const result = await Message.create({ user, room, time, text});

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const getMessageByTeamID = async (req, res) => {
  const {id} = req.params;
   try {
        const msg = await Message.find({ room: id });
        res.json(msg)
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}