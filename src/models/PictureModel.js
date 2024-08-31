import mongoose from "mongoose";

const PicSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    }
});

const PictureModel = mongoose.model('picture', PicSchema);

export default PictureModel;