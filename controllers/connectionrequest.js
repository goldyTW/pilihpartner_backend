import Connection from "../models/connection.js";

export const createConnectionRequest = async (req, res) => {
  const { to, from, status } = req.body;

  try {
    const oldrequest = await Connection.findOne({ to:to, from:from, status:status});

    if (!oldrequest){
        const result = await Connection.create({ to, from, status});
        res.status(201).json({ result });
    }

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
}

export const getConnectionRequest = async (req, res) => {
   try {
        const getStatus = await Connection.find();
        res.json({getStatus})
    } catch (error) {    
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
}

export const updateConnectionRequest = async (req, res) => {
    const { id } = req.params;
    const { to, from, status } = req.body;
    
    try {
      const oldConnectionReq = await Connection.findOne({ _id: id });

      if (!oldConnectionReq) return res.status(404).send(`No connection request found`);

      const updatedConnectionReq = { to, from, status, _id: id };

      await Connection.findByIdAndUpdate(id, updatedConnectionReq, { new: true });

      res.status(200).json({updatedConnectionReq});
    }
    catch (error) {    
        res.status(404).json({ message: error.message });
    }
}