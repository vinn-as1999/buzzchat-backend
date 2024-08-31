import PictureModel from "../models/PictureModel.js"
import UserModel from "../models/UserModel.js"


export default async function imageUploader(obj) {
    return PictureModel.create({
        name: obj.name,
        src: obj.src
    }).then((data) => {
        console.log('a informação:', data);
        return data;

    }).catch((err) => console.log('Erro no serviço imageUploader', err))
};


export async function getProfileData(param) {
    const profileInfo = await UserModel.findOne({
        $or: [{_id: param}, {username: param}]
    });

    if (profileInfo) {
        return profileInfo
        
    } else {
        return {
            message: 'No profile found'
        }
    }
}; 


export async function setProfile(reqBody) {
    try {
        const { id, name, bio, picture } = reqBody;
        console.log(reqBody)
        const updatedProfile = await UserModel.findByIdAndUpdate(
            id,
            { name, bio, picture },
            { new: true }
        );

        if (!updatedProfile) {
            console.log(updatedProfile)
            return {
                message: 'User not found'
            }
        }
        return updatedProfile;

    } catch (error) {
        console.log('Error updating user bio', error);
        return {
            message: 'Error updating user bio'
        }
    }
};
