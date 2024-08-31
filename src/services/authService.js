import UserModel from "../models/UserModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const secretKey = process.env.SECRET_KEY;
const error = `Invalid email or password!`;
let registerError;


export async function register(userData) {
    const { username, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await UserModel.findOne({ username });
    const emailExists = await UserModel.findOne({ email });

    if (userExists) {
        return { message: 'This username is already in use' };
    }

    if (emailExists) {
        return { message: 'This email already exists' };
    }

    try {
        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        const prof = await createProfile(newUser);

        return { 
            message: 'User successfully registered!',
            profileId: prof._id
         };
        
    } catch (error) {
        return {
            message: 'Some error occurred creating a new user',
            error
        };
    }
}

export async function login(loginData) {
    const { email, password } = loginData;

    const user = await UserModel.findOne({ email });

    if (!user) return { 
        error: error
    };
    
    if (user && await bcrypt.compare(password, user.password)) {
        const token  = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h'});
        console.log('Login efetuado');
        return { 
            token: token,
            id: user._id
        }
    } else {
        console.log('Email ou senha inválidos')
        return {
            error: error
        }
    }
};


