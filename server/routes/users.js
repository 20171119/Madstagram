const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        semester: req.user.semester
    });
});

router.post("/register", (req, res) => {
    console.log('/user/register')
    console.log(req.body)
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/getUsers", (req, res) => {

    User.find()
        .exec((err, users) => {
            if(err) return res.status(400).json({success: false})
            return res.status(200).json({success: true, users})
        })

});

router.post("/user_by_id", (req, res) => {
    console.log('user_by_id')
    let userId = req.body.userId
    console.log(userId)
    //we need to find the product information that belong to product Id 
    User.findOne({"_id": userId})
        .exec((err, user) => {
            console.log("in func    " + user)
            if (err) return res.status(400).send(err)
            return res.status(200).json({success: true, user})
        })
});

router.post("/semester", (req, res) => {
    User.find({"semester": req.body.semester})
        .exec((err, users) => {
            if(err) return res.status(400).json({success: false})
            return res.status(200).json({success: true, users})
        })

});


module.exports = router;
