const skillService = require("../services/skillService");
const { addLearningSkill } = require("../services/skillService");



const addSkill = async (req, res) => {
  const { name, proficiency, yearsOfExperience, category } = req.body;

  try {
    const newSkill = await skillService.addSkill(
      req.user._id,
      name,
      proficiency,
      yearsOfExperience,
      category
    );

    res.status(201).json(newSkill);
  } catch (error) {
    console.error("Add skill error:", error.message);
    res.status(500).json({ message: error.message || "Error adding skill" });
  }
};


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



const addToLearningSkill = async (req, res) => {
  try {
    console.log("=== DEBUG INFO ===");
    console.log("Request body:", req.body);
    console.log("User ID:", req.user._id);
    
    const { name, reason, category } = req.body;
    
    // Validate required fields
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: "Skill name is required" });
    }
    
    if (!reason || reason.trim() === '') {
      return res.status(400).json({ message: "Reason is required" });
    }

    const userId = req.user._id;
    
    const skillData = {
      name: name.trim(),
      reason: reason.trim(),
      category: category || 'General',
      addedAt: new Date()
    };

    
    const result = await addLearningSkill(userId, skillData);

    res.status(201).json({
      message: "Skill added to learning path successfully",
      skill: result
    });

  } catch (error) {
    console.error("Add to learning path error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getLearningPath = async (req, res) => {
   try {
        const learningPath = await skillService.getSkillsService(req.user._id);
        res.status(200).json(learningPath);
   } catch (error) {
       console.error("Get learning path error:", error.message);
       res.status(500).json({ message: error.message });
   }
}

const deleteLearning = async (req, res) => {
      const { id } = req.params;  
      try {
           await skillService.deleteLearningSkill(req.user._id, id);
           res.status(204).send();
      } catch (error) {
           console.error("Delete learning skill error:", error.message);
           res.status(500).json({ message: error.message });
      }
};
 
module.exports = {
     addSkill,
     getSkills,
     updateSkill,
     deleteSkill,
     addToLearningSkill,
     getLearningPath,
     deleteLearning
}