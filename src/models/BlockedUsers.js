import mongoose from "mongoose";

const blockedSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    blocked_contact: {
        type: [String],
        default: []
    }
});

const BlockedUsers = mongoose.model('blocked user', blockedSchema);

export default BlockedUsers;