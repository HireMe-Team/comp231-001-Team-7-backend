let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// TODO: Add user schema here

// Education subSchema
let education = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'institution name is required'
    },
    degree: {
        type: String,
        default: '',
        trim: true,
    },
    fieldOfStudy: {
        type: String,
        default: '',
        trim: true,
    },
    startDate: {
        type: Date,
        default: '',
        required: 'start date is required'
    },
    endDate: {
        type: Date,
        default: '',
        required: 'end/expected date is required'
    },
    gpa: {
        type: Number,
        default: ''
    },
    awards: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    }
});

// Work Experience Schema
let workExperience = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'company name is required'
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'job title is required'
    },
    description: {
        type: String,
        default: '',
        trim: true,
        required: 'job description is required'
    },
    employmentType: { //full time / part time / contract
        type: String,
        default: '',
        trim: true
    },
    startDate: {
        type: Date,
        default: '',
        required: 'start date is required'
    },
    endDate: {
        type: Date,
        default: ''
    },
    location: {
        type: String,
        default: '',
        trim: true
    }
});

// Job Seeker Schema
let jobSeekerModel = mongoose.Schema({
    email: { //this will be the username
        type: String,
        default: '',
        trim: true,
        required: 'email is required'
    },
    password: {
        type: String,
        default: '',
        trim: true,
        required: 'password is required'
    },
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
    dateOfBirth: {
        type: Date,
        default: '',
        trim: true,
        required: 'date of birth is required'
    },
    tagLine: {
        type: String,
        default: '',
        trim: true,
    },
    lookingForJob: {
        type: Boolean,
        default: true,
    },
    educationHistory: {
        type: education,
        required: true
    },
    workHistory: {
        type: workExperience
    }
},
    {
        collection:"jobseekers"
    }
);

module.exports.JobSeeker = mongoose.model('jobseeker', jobSeekerModel);


// Recruiter Schema
let recruiterModel = mongoose.Schema({
    email: { //this will be the username
        type: String,
        default: '',
        trim: true,
        required: 'email is required'
    },
    password: {
        type: String,
        default: '',
        trim: true,
        required: 'password is required'
    },
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
    companyName: {
        type: String,
        default: '',
        trim: true,
    },
    position: {
        type: String,
        default: '',
        trim: true,
    }
},
    {
        collection:"recruiters"
    }
);

module.exports.Recruiter = mongoose.model('recruiter', recruiterModel);