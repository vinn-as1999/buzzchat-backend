import * as authService from '../services/authService.js'


export async function register(req, res) {
    try {
        const newUser = await authService.register(req.body);
        res.status(201).json(newUser);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

export async function login(req, res) {
    try {
        const logUser = await authService.login(req.body);
        console.log(logUser);
        res.status(201).json(logUser)
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

export function authToken(req, res) {
    res.status(201).json({
        message: 'Acesso permitido',
        userId: req.user.userId
    });
};


export default register;