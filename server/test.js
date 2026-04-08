import { query } from "./config/dbConfig.js"

const email = 'admin@lms.com';

const admin = async () =>{
    try {
        const result = await query("SELECT * FROM users WHERE email = $1", [email]);
        console.log(result.rows);
    } catch (error) {
        console.error("Error: ", error.message)
    }
}

admin()

