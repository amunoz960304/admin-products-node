import { exit } from 'node:process';
import db from '../config/db';

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    exit(0);
  } catch (error: any) {
    exit(1);
  }
};

if (process.argv[2] === '--clear') {
  clearDB();
}
