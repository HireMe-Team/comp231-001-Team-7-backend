let mongoose = require('mongoose');

//cover letter schema
let coverModel = mongoose.Schema({
    text: { //content
        type: String,
        default: '',
        trim: true,
        required: 'letter content is required'
    },
    lastModifiedDate: {
        type: Date,
        default: '',
    }
},
{
    collection:"coverletters"
}
);

module.exports.CoverLetter = mongoose.model('coverLetter', coverModel);