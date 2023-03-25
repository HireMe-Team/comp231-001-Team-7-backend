let mongoose = require('mongoose');

//job application schema
let applicationModel = mongoose.Schema({
    position: { //job title
        type: String,
        default: '',
        trim: true,
        required: 'job title is required'
    },
    company: {
        type: String,
        default: '',
        trim: true,
        required: 'company name is required'
    },
    type: { //full-time, part-time, contract
        type: String,
        default: '',
        trim: true,
        required: 'job type is required'
    },
    status: { //pending, cancelled or closed
        type: String,
        default: '',
        required: 'status is required'
    },
    applicationDate: {
        type: Date,
        default: '',
        required: true
    },
    //job seeker information
    firstName: {
        type: String,
        default: '',
        trim: true,
        required: 'first name is required'
    },
    lastName: {
        type: String,
        default: '',
        trim: true,
        required: 'last name is required'
    },
    resume: {
        type: String,
        required: true
    },
    coverLetter: {
        type: coverLetter
    }
},
{
    collection:"applications"
}
);

module.exports.Application = mongoose.model('application', applicationModel);