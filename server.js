import express from 'express'
import conn from './src/db/connect.js'
import routes from './src/routes/router.js'
import cors from 'cors'
import path from 'path'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

app.use('/uploads', express.static(path.join(__dirname, 'src/config/uploads')));

// db connection
conn().then(() => {
    app.emit('ready');
});

io.on('connection', (socket) => {
    console.log('New client connected: ', socket.id);

    socket.on('join', (userId) => {
        if (userId) {
            socket.userId = userId;
            socket.join(userId);
            console.log(`user ${userId} conected to ${socket.id}`);
        } else {
            console.log('No userId found in localstorage')
        }
    });

    socket.on('newMessage', (message) => {
        const {sender, receiver} = message;
        console.log(sender, receiver)
        io.emit('message', message)
        io.to(receiver).emit('notification', message)
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected: ', socket.id)
        socket.disconnect();
    });
});

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(routes);

app.on('ready', () => {
    httpServer.listen(process.env.PORT || '3333', () => {
        console.log('Server running on port 3333: http://localhost:3333');
    });
});
