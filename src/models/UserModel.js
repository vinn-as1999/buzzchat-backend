import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // no required info
    name: {
        type: String
    },
    bio: {
        type: String
    },
    picture: {
        type: String
    }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;