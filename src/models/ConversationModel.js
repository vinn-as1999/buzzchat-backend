import mongoose from 'mongoose'

const ConvSchema = mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    participant_1: {
        type: String,
        required: true
    },
    participant_2: {
        type: String,
        required: true
    }
});

const ConversationModel = mongoose.model('Conversation', ConvSchema);

export default ConversationModel;