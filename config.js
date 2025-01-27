import "dotenv/config";

const config = {
    PORT: process.env.PORT,

    FRONTEND_PATH: process.env.FRONTEND_PATH,
    MONGO_URL: process.env.MONGO_URL,
};

export default config