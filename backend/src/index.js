import config from "./config/env.config.js";
import app from "./app.js";
import connectDB from "./config/db.js";

if (connectDB) {
    console.log("Database connected")
} else {
    console.log("Connection issue on database.")
}

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
})