import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

async function conn() {
    try {
        await mongoose.connect(
            process.env.DATABASE_URI
        )
        
        console.log('Connected!');
    } catch (err) {
        console.log('Error connecting to database: ', err)
    }
};

export default conn;