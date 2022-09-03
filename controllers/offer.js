import offer from "../models/offer.js";

export const createOffer = async (req, res) => {
  const { teamid, to, isAccepted, isHold } = req.body;

  try {
    const oldteam = await offer.findOne({ to:to, teamid:teamid});

    if (!oldteam){
        const result = await offer.create({ teamid, to, isAccepted, isHold});
        res.status(201).json({ result });
    }

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
}

export const getOffer = async (req, res) => {
    const {id} = req.params;

   try {
        const offers = await offer.find({to:id});
        res.json({data:offers})
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const updateOffer = async (req, res) => {
    const { id } = req.params;
    const { isAccepted, isHold } = req.body;
    
    const oldOffer = await offer.findOne({ _id: id });

    if (!oldOffer) return res.status(404).send(`No team with id: ${id}`);

    const updatedOffer = { isAccepted, isHold, _id: id };

    await offer.findByIdAndUpdate(id, updatedOffer, { new: true });

    res.json(updatedOffer);
}