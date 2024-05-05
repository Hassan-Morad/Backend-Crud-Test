import mongoose, { Connection } from "mongoose";


const db_connection = async (): Promise<Connection> => {
    
    
    try {
        const connection = await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB');
        return connection.connection;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

export default db_connection;
