// import { createClient } from "redis";

// const redisClient = createClient({
//     url: "redis://localhost:6379",
// });

// redisClient.on("error", (err) => {
//     console.log("Redis error, continuing without cache");
// });

// (async () => {
//     try {
//         await redisClient.connect();
//         console.log("Redis connected");
//     } catch (err) {
//         console.log("Redis not running, skipping cache");
//     }
// })();

// export default redisClient;