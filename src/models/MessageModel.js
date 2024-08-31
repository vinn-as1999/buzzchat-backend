import mongoose from "mongoose";

const MsgSchema = mongoose.Schema({
    conversation_id: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    }
});

const MessageModel = mongoose.model('Message', MsgSchema);

export default MessageModel;