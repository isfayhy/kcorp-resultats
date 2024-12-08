import { ChannelType, PermissionFlagsBits } from 'discord.js';
import { updateGuildConfig } from '../services/guildConfig.js';
import logger from '../utils/logger.js';

export async function handleGuildCreate(guild) {
  try {
    // Créer un nouveau canal pour les résultats
    const channel = await guild.channels.create({
      name: 'kcorp-results',
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.id,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory],
          deny: [PermissionFlagsBits.SendMessages]
        },
        {
          id: guild.client1.user.id,
          allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks]
        }
      ]
    });

    // Sauvegarder la configuration du serveur
    await updateGuildConfig(guild.id, {
      resultsChannelId: channel.id
    });

    await channel.send({
      embeds: [{
        title: 'Bot KCorp Esports - Configuration terminée !',
        description: 'Ce canal recevra automatiquement les résultats des matchs de la KCorp.\n\nUtilisez `/help` pour voir la liste des commandes disponibles.',
        color: 0x0099ff
      }]
    });

    logger.info('Bot ajouté à un nouveau serveur', {
      guildId: guild.id,
      guildName: guild.name,
      channelId: channel.id
    });
  } catch (error) {
    logger.error('Erreur lors de la configuration du serveur', {
      guildId: guild.id,
      error: error.message
    });
  }
}