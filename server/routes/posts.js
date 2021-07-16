const express = require('express');
const router = express.Router();
const { Post } = require("../models/Post");
const multer = require('multer');

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


//=================================
//             Post
//=================================

router.post("/uploadImage", auth, (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});

module.exports = router;

router.post("/uploadPosts", auth, (req, res) => {

    //save all the data we got from the client into the DB 
    const post = new Post(req.body)

    post.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

router.post("/getPosts", auth, (req, res) => {

    Post.find()
        .populate("writer")
        .exec((err, posts) => {
            if(err) return res.status(400).json({success: false})
            return res.status(200).json({success: true, posts})
        })

});

// //?id=${productId}&type=single
// // //id=12121212,121212,1212121   type=array 
// router.get("/posts_by_id", (req, res) => {
//     let type = req.query.type
//     let postIds = req.query.id

//     console.log("req.query.id", req.query.id)

//     // if (type === "array") {
//     //     let ids = req.query.id.split(',');
//     //     productIds = [];
//     //     productIds = ids.map(item => {
//     //         return item
//     //     })
//     // }

//     // console.log("productIds", productIds)


//     //we need to find the product information that belong to product Id 
//     Post.find({ '_id': { $in: postIds } })
//         .populate('writer')
//         .exec((err, post) => {
//             if (err) return res.status(400).send(err)
//             return res.status(200).send(product)
//         })
// });