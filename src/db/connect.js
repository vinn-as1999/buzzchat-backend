import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

async function conn() {
    try {
        await mongoose.connect(
            process.env.DATABASE_URI
        )
        
        console.log('Conectado!');
    } catch (err) {
        console.log('erro ao conectar: ', err)
    }
};

export default conn;