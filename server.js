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
        socket.userId = userId
        console.log(`user ${userId} conected to ${socket.id}`)
    });

    socket.on('newMessage', (message) => {

        io.emit('message', message)
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected: ', socket.id)
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
        console.log('server rodando na porta 3333: http://localhost:3333');
    });
});
