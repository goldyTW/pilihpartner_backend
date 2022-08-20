import Team from "../models/team.js";

export const createTeam = async (req, res) => {
  const { name, leader, member } = req.body;

  try {
    const result = await Team.create({ name, leader, member });

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const updateTeam = async (req, res) => {
    const { id } = req.params;
    const { name, member } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No team with id: ${id}`);

    const updatedTeam = { name, member, _id: id };

    await Team.findByIdAndUpdate(id, updatedTeam, { new: true });

    res.json(updatedTeam);
}

export const getTeam = async (req, res) => {
   try {
        const Teams = await Team.find();
        res.json({data:Teams})
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getMyTeam = async (req, res) => {
  const {id} = req.params
   try {
        const Teams = await Team.find({ leader: id });
        res.json({data:Teams})

    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}