import Team from "../models/team.js";

export const createTeam = async (req, res) => {
  const { name, leader, member, isConfirmed, description } = req.body;

  try {
    const result = await Team.create({ name, leader, description, isConfirmed, member, member2:[], github:'', figma:'', timeline:'', requirement:'', isFinished:false, createdAt: new Date(), updatedAt: new Date()});

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const updateTeam = async (req, res) => {
    const { id } = req.params;
    const { name, member, memberupdate, isConfirmed, github, figma, requirement, timeline, isFinished } = req.body;
    
    const oldteam = await Team.findOne({ _id: id });

    if (!oldteam) return res.status(404).send(`No team with id: ${id}`);

    if(memberupdate){
      const updatedTeam = { name, member, member2:memberupdate, isConfirmed, github, figma, requirement, timeline,updatedAt: new Date(),  _id: id};
      await Team.findByIdAndUpdate(id, updatedTeam, { new: true });
      res.json(updatedTeam);
    }
    else{
      if(member){
        if(!oldteam.isConfirmed){
          let member2 = [];
          member.map((item) => member2.push({id:item, role:''}))
          const updatedTeam = { name, member, member2, isConfirmed, github, figma, requirement, timeline, updatedAt: new Date(), _id: id };
          await Team.findByIdAndUpdate(id, updatedTeam, { new: true });
          res.json(updatedTeam);
        }else{
          let member1 = JSON.stringify(oldteam.member)
          member1 = JSON.parse(member1);
          member.map((item) => member1.push(item))

          let member2 = JSON.stringify(oldteam.member2)
          member2 = JSON.parse(member2);
          member.map((item) => member2.push({id:item, role:''}))

          const updatedTeam = { name, member:member1, member2, isConfirmed, github, figma, requirement, timeline, updatedAt: new Date(), _id: id };
          await Team.findByIdAndUpdate(id, updatedTeam, { new: true });
          res.json(updatedTeam);
        }
      }
      else{
        const updatedTeam = { name, isConfirmed, github, figma, requirement, timeline, isFinished, updatedAt: new Date(), _id: id };
        await Team.findByIdAndUpdate(id, updatedTeam, { new: true });
        res.json(updatedTeam);
      }
    }
    
    
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