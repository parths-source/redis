import express from 'express';
import Redis from 'ioredis';
import mongoose from 'mongoose';

const app=express();

const redis=new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.get("/redis", async(req:any,res:any)=>{
    const reply=await redis.ping();
    res.send(`redis replies with ${reply}`);

});

app.get("/mongo", async(req:any,res:any)=>{
    const url=process.env.MONGO_URL || "mongodb://localhost:27017/mongo";
    if(mongoose.connection.readyState===0){
        await mongoose.connect(url);
    }
    console.log("mongo:connected")
    res.send("mongodb connected")
});

app.listen(3000,()=>{
    console.log("running on port 3000");
})



