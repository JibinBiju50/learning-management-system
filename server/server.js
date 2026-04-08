import app from './app.js';
import { config } from 'dotenv';
config();
import { createRefreshTokenTable, deletedExpiredToken } from './models/refreshTokenModel.js';
import { createUserTable } from './models/userModel.js';



const port = process.env.PORT;

const start = async () =>{
  try {
    await createUserTable();
    await createRefreshTokenTable();

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

    //clean up expired refresh token every 24 hours
    setInterval(deletedExpiredToken, 24 * 60 * 60 * 1000);
    })
    
  } catch (error) {
    console.error("Failed to start the server", error);
    process.exit(1);
  }
}

start();

