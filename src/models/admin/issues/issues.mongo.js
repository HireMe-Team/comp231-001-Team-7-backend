let mongoose = require('mongoose');

//issues schema
let issueModel = mongoose.Schema({
    issueID:{
        type:String,
        default: '',
        unique: true,
        required: true,
    },
    title: { //issue title
        type: String,
        default: '',
        required: true
    },
    userId: { // the userID of the issue reporter
        type: Number,
        default: '',
        required: true
    },
    issueDetail: { // the detail description of the issue
        type: String,
        default: '',
        required: true,
    },
    status: { //pending, replied, or closed
        type: String,
        default: '',
        required: 'status is required'
    },
    reportDate: {
        type: Date,
        default: '',
        required: true
    },
    replyMessage:{ // the unique id for a message, refer to the schema of messages
        type: String,
        default: '',
        required: false
    }
},
{
    collection:"issues"
}
);

module.exports.issue = mongoose.model('issue', issueModel);
