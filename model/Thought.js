const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    thoughtText : {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (value) => dateFormat(value)
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    reactions: [{
        reactionText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdBy: { 
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (value) => dateFormat(value)
        }

    }],
})

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length();
})

module.exports  = mongoose.model('Thought', thoughtSchema)