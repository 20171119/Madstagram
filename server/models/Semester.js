const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semesterSchema = mongoose.Schema({
    semester: {
        type: String
    }, 
    studentsNum: {
        type: Number,
        default: 0
    },
    postsNum: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


const Semester = mongoose.model('Semester', semesterSchema);

module.exports = { Semester }