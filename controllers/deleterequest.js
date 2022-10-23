import Request from "../models/deleterequest.js";

export const createDeleteRequest = async (req, res) => {
  const { membername, memberid, teamname, teamid } = req.body;

  try {
    const result = await Request.create({ membername, memberid, teamid, teamname, isConfirmed:false, createdAt: new Date(), updatedAt: new Date()});

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const getPerID = async (req, res) => {
  const {id} = req.params;
   try {
        const result = await Request.find({ teamid: id, isConfirmed: false });
        res.json({data: result})
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}