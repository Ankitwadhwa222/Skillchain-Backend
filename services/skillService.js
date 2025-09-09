const User = require("../models/User");

// Add Skill
const addSkill = async (_id, name, level, yearsOfExperience) => {
  const user = await User.findById(_id);
  // console.log(user);  
  
  if (!user) throw new Error("User not found");

  const newSkill = { name, level, yearsOfExperience };
  user.skills.push(newSkill);

  await user.save();
  return newSkill;
};

// Get Skills
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

module.exports = {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill,
};
