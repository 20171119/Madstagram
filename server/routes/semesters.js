const express = require('express');
const router = express.Router();
const { Semester } = require("../models/Semester");
const { auth } = require("../middleware/auth");


//=================================
//             Post
//=================================


// auth 빠짐
router.post("/create", (req, res) => {
    console.log("/semester/create")
    //save all the data we got from the client into the DB 
    const newSemester = {
        "semester": req.body.semester,
        "studentsNum": 0,
        "postsNum": 0
    }

    newSemester.save((err, semester) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, semseter })
    })

});

// auth 빠짐
router.post("/getSemester", (req, res) => {

    Post.find({ 'semester': req.body.semester })
        .populate("writer")
        .exec((err, posts) => {
            if(err) return res.status(400).json({success: false})
            return res.status(200).json({success: true, posts})
        })

});

router.delete("/delete", (req, res) => {
    console.log('post_delete')
    let postIds = req.body._id
    console.log(postIds)
    Post.findOneAndDelete({"_id": postIds}, (err, post) => {
        if (err) return res.status(400).send(err)
        return res.status(200).send(post)
    })
})

router.put("/update", (req, res) => {

    let filter = {
        "_id": req.body._id
    }

    let update = {
        "title": req.body.title,
        "content": req.body.content
    }

    Post.findOneAndUpdate(
        filter,
        update,
        {
            new: true
        },
        (err, post) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(post)
        }
    )
})

module.exports = router;