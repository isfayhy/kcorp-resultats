import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { CONFIG } from '../config/index.js';
import logger from '../utils/logger.js';

const commands = [
  new SlashCommandBuilder()
    .setName('lastmatch')
    .setDescription('Affiche le dernier match de la KCorp'),
  new SlashCommandBuilder()
    .setName('nextmatch')
    .setDescription('Affiche le prochain match de la KCorp'),
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche l\'aide du bot'),
  new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Configure le canal des résultats')
    .setDefaultMemberPermissions('0') // Réservé aux administrateurs
];

export async function initializeCommands(client) {
  const rest = new REST({ version: '10' }).setToken(CONFIG.discord.token);

  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    logger.info('Commandes slash enregistrées avec succès');
  } catch (error) {
    logger.error('Erreur lors de l\'enregistrement des commandes', {
      error: error.message
    });
  }
}