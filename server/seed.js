import { config } from 'dotenv';
config();
import bcrypt from 'bcrypt';
import { findByEmail, createUser, createUserTable } from './models/userModel.js';

const seedAdmin = async () => {
    try {
        await createUserTable();

        const existingAdmin = await findByEmail('admin@lms.com');

        if (existingAdmin) {
            console.log("Admin already exists!");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD, 10);
        await createUser('adminLMS', 'admin@lms.com', hashedPassword, 'admin');

        console.log("Admin account created successfully");
        console.log("Email: admin@lms.com");
        console.log("Please change password after first login");
        process.exit(0);

    } catch (error) {
        console.log("Error during admin seeding:", error.message);
        process.exit(1);
    }
};

seedAdmin();