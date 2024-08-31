import jwt from 'jsonwebtoken';

export default function tokenMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.sendStatus(401).json({message: 'unauthorized'});

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user;

        next();
    });
};