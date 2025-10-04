const User = require("../models/User");
const genAI = require("../services/gemini");

const getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user || !Array.isArray(user.skills) || user.skills.length === 0) {
      return res.status(404).json({ message: "No skills found for the user" });
    }

    // Build skill summary for AI
    const skillList = user.skills
      .map(
        (s) =>
          `${s.name} (${s.category || "N/A"}, proficiency: ${s.proficiency || 0}%)`
      )
      .join(", ");

    // ✅ Get Gemini model instance
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `User's current skills: ${skillList}.
Suggest 3 new skills that would complement these skills and help the user grow professionally.
Respond in pure JSON format like this:
[
  { "name": "New Skill 1", "reason": "Reason for recommendation" },
  { "name": "New Skill 2", "reason": "Reason for recommendation" },
  { "name": "New Skill 3", "reason": "Reason for recommendation" }
]`;

    // Generate content
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    // Extract AI text safely from actual response path
    const aiText =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!aiText) {
      return res
        .status(500)
        .json({ message: "No text returned by AI", raw: result });
    }

    // Try parsing JSON
    let recommendations;
    try {
      // Clean response in case AI added extra text
      const firstBracket = aiText.indexOf("[");
      const lastBracket = aiText.lastIndexOf("]") + 1;
      const cleaned = aiText.slice(firstBracket, lastBracket);

      recommendations = JSON.parse(cleaned);
    } catch (error) {
      console.error("JSON parsing error:", error);
      return res
        .status(500)
        .json({ message: "AI response was not valid JSON", raw: aiText });
    }

    res.status(200).json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getRecommendations,
};
