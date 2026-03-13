const express = require('express');
const Redis = require('ioredis');

const app = express();
const redis = new Redis(process.env.REDIS_URL);

app.use(express.json());

app.post('/tasks', async (req, res) => {
    const { taskName } = req.body;
    
    await redis.lpush('task_queue', JSON.stringify({ name: taskName, time: new Date() }));
    return res.status(201).json({ message: "Task queued successfully!" });
});

app.get('/health', (req, res) => res.send("API is Healthy"));

app.listen(3000, () => console.log("API Service running on port 3000"));