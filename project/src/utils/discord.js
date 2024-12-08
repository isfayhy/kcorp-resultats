import { EmbedBuilder } from 'discord.js';
import { getGuildConfig } from '../services/guildConfig.js';
import logger from './logger.js';

export async function sendMatchUpdate(client, matchData) {
  // Envoyer la mise à jour à tous les serveurs configurés
  for (const [guildId, config] of client.guilds.cache) {
    const guildConfig = getGuildConfig(guildId);
    if (!guildConfig?.resultsChannelId) continue;

    const channel = client.channels.cache.get(guildConfig.resultsChannelId);
    if (!channel) {
      logger.warn('Canal de résultats non trouvé', { guildId, channelId: guildConfig.resultsChannelId });
      continue;
    }

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(matchData.title)
      .setDescription(matchData.description)
      .setTimestamp(matchData.timestamp)
      .setFooter({ text: matchData.game });

    try {
      await channel.send({ embeds: [embed] });
      logger.info('Résultat envoyé avec succès', { guildId, channelId: channel.id });
    } catch (error) {
      logger.error('Erreur lors de l\'envoi du résultat', {
        guildId,
        channelId: channel.id,
        error: error.message
      });
    }
  }
}