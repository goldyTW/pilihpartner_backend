import offer from "../models/offer.js";

export const createOffer = async (req, res) => {
  const { teamid, to, isAccepted, isHold } = req.body;

  try {
    const oldteam = await offer.findOne({ to:to, teamid:teamid});

    if (!oldteam){
        const result = await offer.create({ teamid, to, isAccepted, isHold, createdAt: new Date(), updatedAt: new Date()});
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

  export const getSingleOffer = async (req, res) => {
      const {id, idteam} = req.params;

    try {
          const offer = await offer.findOne({to:id, teamid:idteam});
          res.json({data:offer})
      } catch (error) {    
          res.status(404).json({ message: error.message });
      }
  }

export const updateOffer = async (req, res) => {
    const { id } = req.params;
    const { isAccepted, isHold } = req.body;
    
    const oldOffer = await offer.findOne({ _id: id });

    if (!oldOffer) return res.status(404).send(`No offer with id: ${id}`);

    const updatedOffer = { isAccepted, isHold, _id: id, updatedAt: new Date() };

    await offer.findByIdAndUpdate(id, updatedOffer, { new: true });

    res.json(updatedOffer);
}

export const deleteOffer = async (req, res) => {
    const { id, idteam } = req.params;
    
    const oldOffer = await offer.findOneAndDelete({ to: id, teamid:idteam });

    if (!oldOffer) return res.status(404).send(`No offer to: ${id}`);

    res.json({success:true});
}