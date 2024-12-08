import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
config({ path: join(__dirname, '../../.env') });

export const CONFIG = {
  discord: {
    token: process.env.DISCORD_TOKEN,
    channelId: process.env.RESULTS_CHANNEL_ID
  },
  sportsdev: {
    apiKey: process.env.SPORTSDEV_API_KEY,
    teamId: process.env.KCORP_TEAM_ID,
    baseUrl: 'https://api.sportsdev.com/esports'
  },
  app: {
    checkInterval: parseInt(process.env.CHECK_INTERVAL, 10),
    environment: process.env.NODE_ENV || 'development'
  }
};

// Validation des variables d'environnement requises
const requiredEnvVars = [
  'DISCORD_TOKEN',
  'SPORTSDEV_API_KEY',
  'KCORP_TEAM_ID'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`La variable d'environnement ${envVar} est requise mais n'est pas définie.`);
  }
}