const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semesterSchema = mongoose.Schema({
    semester: {
        type: String
    }, 
    students: {
        type: Number
    }
}, { timestamps: true })


const Semester = mongoose.model('Semester', semesterSchema);

module.exports = { Semester }