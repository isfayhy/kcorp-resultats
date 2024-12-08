import fetch from 'node-fetch';
import { sendMatchUpdate } from '../utils/discord.js';
import { CONFIG } from '../config/index.js';
import logger from '../utils/logger.js';

export async function checkKCorpMatches(client) {
  try {
    const response = await fetch(
      `${CONFIG.sportsdev.baseUrl}/matches?team=${CONFIG.sportsdev.teamId}`,
      {
        headers: {
          'Authorization': `Bearer ${CONFIG.sportsdev.apiKey}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`API response error: ${response.status}`);
    }

    const matches = await response.json();
    
    for (const match of matches) {
      if (isNewResult(match)) {
        await sendMatchUpdate(client, formatMatchResult(match));
        logger.info('New match result sent', { matchId: match.id });
      }
    }
  } catch (error) {
    logger.error('Error checking matches:', { error: error.message });
  }
}

function isNewResult(match) {
  return match.status === 'FINISHED' && !match.resultAnnounced;
}

function formatMatchResult(match) {
  return {
    title: `Résultat du match - ${match.tournament.name}`,
    description: `${match.team1.name} ${match.score1} - ${match.score2} ${match.team2.name}`,
    game: match.game,
    timestamp: match.endTime
  };
}