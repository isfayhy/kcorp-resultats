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

const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Créer une instance du client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Quand le bot est prêt
client.once('ready', () => {
    console.log(`Le bot ${client.user.tag} est connecté à Discord !`);
});

// Connecter le bot à Discord
client.login(process.env.DISCORD_TOKEN);

// Créer une route simple pour tester le serveur HTTP
app.get('/', (req, res) => {
    res.send('Le bot Discord.js fonctionne !');
});

// Démarrer le serveur HTTP sur le port 8080
app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});
