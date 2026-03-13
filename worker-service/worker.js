const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

async function processTasks() {
    console.log("Worker started. Waiting for tasks...");
    while (true) {
        
        const task = await redis.brpop('task_queue', 0); 
        const taskData = JSON.parse(task[1]);
        console.log(`[PROCESSOR] Processing task: ${taskData.name}`);
        
        await new Promise(res => setTimeout(res, 2000));
        console.log(`[SUCCESS] Completed: ${taskData.name}`);
    }
}

processTasks();