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

    const semester = new Semester(newSemester);


    semester.save((err, semester) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, semester })
    })

});

router.post("/getSemesters", (req, res) => {
    console.log("/semester/getSemesters")
    Semester.find()
        .populate("writer")
        .exec((err, semesters) => {
            if(err) return res.status(400).json({success: false})
            return res.status(200).json({success: true, semesters})
        })

});


// auth 빠짐
router.post("/getSemester", (req, res) => {

    Semester.find({ 'semester': req.body.semester })
        .populate("writer")
        .exec((err, semester) => {
            if(err) return res.status(400).json({success: false})
            return res.status(200).json({success: true, semester})
        })

});

router.delete("/delete", (req, res) => {
    console.log('post_delete')
    let postIds = req.body._id
    console.log(postIds)
    Semester.findOneAndDelete({"_id": postIds}, (err, semester) => {
        if (err) return res.status(400).send(err)
        return res.status(200).send(semester)
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

    Semester.findOneAndUpdate(
        filter,
        update,
        {
            new: true
        },
        (err, semester) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(semester)
        }
    )
})

module.exports = router;