import mongoose from "mongoose";


const FriendsSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    friend_list: [{
        type: String
    }]
});

const FriendsModel = mongoose.model('Friend', FriendsSchema);


export default FriendsModel;