const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { auth } = require("../middleware/auth");

//=================================
//             Likes DisLikes
//=================================

router.post("/getLikes", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId }
    } else {
        variable = { commentId: req.body.commentId }
    }
    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })
})


router.post("/upLike", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    const like = new Like(variable)
    //save the like information data in MongoDB
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true })
    })

})




router.post("/unLike", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

})

module.exports = router;