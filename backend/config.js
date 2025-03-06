import dotenv from "dotenv";
dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const STRIPE_SECRET_KEY = "sk_test_51QxiWTJMLkXroeApE8MShrOSBgLBKAZ7hI1XoyCwTxtm3dXVsTBvrCMdGEc4ysgGEL0dbksOJa249niI0BS2A5tu00vFTUalLq";

export default {
    JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD,
    STRIPE_SECRET_KEY,
};
