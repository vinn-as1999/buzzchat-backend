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

const users = {};
io.on('connection', (socket) => {

    socket.on('online', (userId) => {
        console.log('users', users)
        users[userId] = socket.id;
        io.emit('Online', {
            id: userId,
            status: 'Online'
        })
    });

    socket.on('newMessage', (message) => {
        const { sender, receiver } = message;
        
        const room = [ sender, receiver ].sort().join('-');
        socket.join(room);

        const receiverSocket = users[receiver];

        if (receiverSocket) {
            io.sockets.sockets.get(receiverSocket).join(room);
            console.log(io.sockets.adapter.rooms.get(room))
        };

        io.to(room).emit('message', message)
        io.to(room).emit('notification', {
            title: 'New message',
            content: message.content
        })
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected: ', socket.id)
        io.emit('Offline', 'Offline')
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
