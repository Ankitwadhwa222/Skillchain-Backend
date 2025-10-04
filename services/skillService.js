const User = require("../models/User");
 
const addSkill = async (_id, name, proficiency, yearsOfExperience, category) => {
  const user = await User.findById(_id);
  if (!user) throw new Error("User not found");

  if (!user.skills) user.skills = [];

  // Prevent duplicates
  const alreadyExists = user.skills.some(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );
  if (alreadyExists) throw new Error("Skill already exists");

  const newSkill = { name, proficiency, yearsOfExperience, category };
  user.skills.push(newSkill);

  await user.save();
  return newSkill;
};



 
const getSkills = async (_id) => {
  const user = await User.findById(_id);
  if (!user) throw new Error("User not found");
  return user.skills;
};

// Update Skill
const updateSkill = async (_id, skillId, updatedData) => {
  const user = await User.findById(_id);
  if (!user) throw new Error("User not found");

  const skill = user.skills.id(skillId); // ✅ correct way
  if (!skill) throw new Error("Skill not found");

  Object.assign(skill, updatedData); // dynamically update fields

  await user.save();
  return skill;
};


// Delete Skill
const deleteSkill = async (_id, skillId) => {
  const user = await User.findById(_id);
  if (!user) throw new Error("User not found");

  const skill = user.skills.id(skillId);
  if (!skill) throw new Error("Skill not found");

  skill.deleteOne(); // safer than remove()
  await user.save();

  return { message: "Skill deleted successfully" };
};

const addLearningSkill = async (_id, skillData) => {
  try {
    console.log("Service received:", { _id, skillData });
    
    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");
    
    // Initialize learningPath if it doesn't exist
    if (!user.learningPath) {
      user.learningPath = [];
    }

    // Validate skill data
    if (!skillData.name || skillData.name.trim() === '') {
      throw new Error("Skill name is required");
    }

    // Check for duplicates
    const alreadyExists = user.learningPath.some(
      (s) => s.name.toLowerCase() === skillData.name.toLowerCase()
    );
    if (alreadyExists) throw new Error("Skill already in learning path");

    // Create the skill object
    const newLearningSkill = {
      name: skillData.name,
      reason: skillData.reason || 'No reason provided',
      category: skillData.category || 'General',
      addedAt: skillData.addedAt || new Date()
    };

    console.log("Adding skill:", newLearningSkill);

    user.learningPath.push(newLearningSkill);
    await user.save();

    console.log("Skill added successfully");
    return newLearningSkill;

  } catch (error) {
    console.error("Service error:", error.message);
    throw error;
  }
};


const getSkillsService = async (_id) => {
  const user = await User.findById(_id);
  if (!user) throw new Error("User not found");
  return user.learningPath || [];
};

const deleteLearningSkill = async (_id, skillId) => {
  const user = await User.findById(_id);
  if (!user) throw new Error("User not found");  
  if (!user.learningPath) throw new Error("Learning path not found");

  const skill = user.learningPath.id(skillId);
  if (!skill) throw new Error("Skill not found in learning path");

  skill.deleteOne();
  await user.save();

  return { message: "Skill deleted successfully" };
};

module.exports = {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill,
  addLearningSkill,
  getSkillsService,
  deleteLearningSkill
};
