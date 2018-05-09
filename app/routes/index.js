const express = require('express');
const router = express.Router();

// home router
router.get('/', (req, res) => {
  res.json({ result: "Success!" });
});

module.exports = router;
