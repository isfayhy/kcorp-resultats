import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = join(__dirname, '../../data/guildConfig.json');

let guildConfigs = new Map();

export async function loadGuildConfigs() {
  try {
    const data = await readFile(CONFIG_PATH, 'utf8');
    const configs = JSON.parse(data);
    guildConfigs = new Map(Object.entries(configs));
  } catch (error) {
    if (error.code !== 'ENOENT') {
      logger.error('Erreur lors du chargement des configurations', { error: error.message });
    }
  }
}

export async function updateGuildConfig(guildId, config) {
  guildConfigs.set(guildId, config);
  try {
    await writeFile(
      CONFIG_PATH,
      JSON.stringify(Object.fromEntries(guildConfigs), null, 2)
    );
  } catch (error) {
    logger.error('Erreur lors de la sauvegarde de la configuration', {
      guildId,
      error: error.message
    });
  }
}

export function getGuildConfig(guildId) {
  return guildConfigs.get(guildId);
}