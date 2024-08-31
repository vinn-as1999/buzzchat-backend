import imageUploader, { setProfile, getProfileData } from '../services/profileService.js'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function uploadImg(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'No file provided'
            });
        }

        if (!req.body.name) {
            return res.status(400).json({
                message: 'No name provided in request body'
            });
        }

        const {name} = req.body;
        const file = req.file;
        const obj = {
            name,
            src: file.filename
        };

        const image = await imageUploader(obj);

        if(image) {
            res.status(200).json({image});
        } else {
            res.status(500).json({
                message: 'Some error uploading image'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error uploading image',
            error
        });
    }
};


export async function getProfileInfo(req, res) {
    try {

        const profileInfo = await getProfileData(req.query.param);

        if (!profileInfo) {
            res.status(400).json({
                message: 'No profile data found'
            })
        }

        res.status(200).json({profileInfo})

    } catch (error) {
        console.log('erro no controlador getProfile', error);
        res.status(400).json({
            message: 'Some error ocurred on the controller function'
        })
    }
};


export async function setProfileController(req, res) {
    const updatedProfile = await setProfile(req.body);

    console.log(req.body);

    if (!updatedProfile) {
        res.json({
            message: 'No bio here'
        });
    };

    res.status(200).json(updatedProfile);
};