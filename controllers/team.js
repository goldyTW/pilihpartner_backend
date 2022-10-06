import Team from "../models/team.js";

export const createTeam = async (req, res) => {
  const { name, leader, member, isConfirmed } = req.body;

  try {
    const result = await Team.create({ name, leader, member, isConfirmed});

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const updateTeam = async (req, res) => {
    const { id } = req.params;
    const { name, member, isConfirmed, github, figma, requirement, timeline } = req.body;
    
    const oldteam = await Team.findOne({ _id: id });

    if (!oldteam) return res.status(404).send(`No team with id: ${id}`);

    const updatedTeam = { name, member, isConfirmed, github, figma, requirement, timeline, _id: id };

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

export const getTeamPerID = async (req, res) => {
  const {id} = req.params;
   try {
        const team = await Team.findOne({ _id: id });
        res.json({data:team})
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