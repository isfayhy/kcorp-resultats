import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { config } from 'dotenv';
import { checkKCorpMatches } from './services/matches.js';
import { initializeCommands } from './commands/index.js';
import { handleGuildCreate } from './events/guildCreate.js';
import { CONFIG } from './config/index.js';
import logger from './utils/logger.js';

config();

const client1 = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client1.once('ready', () => {
  logger.info(`Bot connecté en tant que ${client1.user.tag}`);
  initializeCommands(client1);
  setInterval(() => checkKCorpMatches(client1), CONFIG.app.checkInterval);
});

// Gestion de l'ajout du bot à un nouveau serveur
client1.on('guildCreate', handleGuildCreate);

client1.login(CONFIG.discord.token);

const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Créer une instance du client1 Discord
const client1 = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Quand le bot est prêt
client1.once('ready', () => {
    console.log(`Le bot ${client1.user.tag} est connecté à Discord !`);
});

// Connecter le bot à Discord
client1.login(process.env.DISCORD_TOKEN);

// Créer une route simple pour tester le serveur HTTP
app.get('/', (req, res) => {
    res.send('Le bot Discord.js fonctionne !');
});

// Démarrer le serveur HTTP sur le port 8080
app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});
