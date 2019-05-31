const express = require("express");
const router = express.Router();
const auth = require("../../routes/middleware/auth");
const User = require("../../models/Users");


//@route  GET api/profile
//@desc   Profile Route
//@access public
router.get("/", auth, async (req, res) => {
    console.log(req);
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;