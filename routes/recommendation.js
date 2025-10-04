const express = require('express');
const router = express.Router();
const {getRecommendations} = require("../controller/recommendations");
const {protect} = require('../middleware/authMiddleware');

router.get('/' , protect , getRecommendations);

module.exports = router;