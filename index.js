import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileRoutes from '../backend/src/routes/fileRoutes.routes.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    return res.send('Converter API .');
});

app.use("/api/files", fileRoutes);
app.listen(PORT,()=>{
    console.log(`I'm running on port ${PORT}`);
});