const skillService = require("../services/skillService");

const addSkill = async (req , res) => {
     const {name , level , yearsofExperience} = req.body;
     try {
          const newSkill = await skillService.addSkill(req.user._id, name, level, yearsofExperience);
          console.log(newSkill);
          
          res.status(201).json(newSkill);
     } catch (error) {
          res.status(500).json({ message: "Error adding skill" });
     }

}

const getSkills = async(req , res) => {
     try {
          const skills = await skillService.getSkills(req.user._id);
          res.status(200).json(skills);
     }
     catch (error) {
          res.status(500).json({ message: "Error fetching skills" });
     }
}

const updateSkill = async (req, res) => {
     const { id } = req.params;
     const updatedData = req.body;
     const userId = req.user._id;
     try {
          const updatedSkill = await skillService.updateSkill(userId, id, updatedData);
          res.status(200).json(updatedSkill);
     } catch (error) {
          res.status(500).json({ message: "Error updating skill" });  
     }
}


const deleteSkill = async (req, res) => {
     const { id } = req.params;
     try {
          await skillService.deleteSkill(req.user._id, id);
          res.status(204).send();
     } catch (error) {
          res.status(500).json({ message: "Error deleting skill" });
     }
}

module.exports = {
     addSkill,
     getSkills,
     updateSkill,
     deleteSkill
}