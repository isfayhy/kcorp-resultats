import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { config } from 'dotenv';
import { checkKCorpMatches } from './services/matches.js';
import { initializeCommands } from './commands/index.js';
import { handleGuildCreate } from './events/guildCreate.js';
import { CONFIG } from './config/index.js';
import logger from './utils/logger.js';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.once('ready', () => {
  logger.info(`Bot connecté en tant que ${client.user.tag}`);
  initializeCommands(client);
  setInterval(() => checkKCorpMatches(client), CONFIG.app.checkInterval);
});

// Gestion de l'ajout du bot à un nouveau serveur
client.on('guildCreate', handleGuildCreate);

client.login(CONFIG.discord.token);