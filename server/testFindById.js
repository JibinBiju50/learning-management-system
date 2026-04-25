import { findById } from './models/userModel.js';
import { createNewCourse } from './models/courseModel.js';

const run = async () => {
  const user = await createNewCourse(); // Replace 1 with the user ID you want to test
  console.log(user);
};

run();