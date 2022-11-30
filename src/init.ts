import { config as dotenv } from 'dotenv';

dotenv({ override: true });

const ENV = process.env.MODE || 'production';
const DEBUG = process.env.DEBUG ? Boolean(JSON.parse(process.env.DEBUG)) : ENV === 'develop';

export const config: Environment.Configuration = {
  MODE: ENV,
  DEBUG,
};
