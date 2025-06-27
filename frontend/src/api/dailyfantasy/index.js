import { getLogger } from '../../core/logging/logger';
import { getMetrics } from '../../core/metrics/metrics';


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { site, date, sport } = req.body;

    if (!apiKey) {
        return res.status(401).json({ error: 'API key is required' });
    }
    try {



        metrics.timing('dailyfantasy_api_request_duration', duration, {
            site,
            sport,
        });
        logger.info('Successfully fetched DailyFantasy data', {
            site,
            sport,
            date,
            playerCount: data.length,
        });
        return res.status(200).json(data);
    }
    catch (error) {

        logger.error('Error fetching DailyFantasy data', {
            error: errorMessage,
            site,
            sport,
            date,
        });
        metrics.increment('dailyfantasy_api_error', {
            site,
            sport,
            error: errorMessage,
        });
        return res.status(500).json({ error: errorMessage });
    }
}
async function fetchDailyFantasyData(site, date, sport, apiKey) {

    const response = await fetch(`${baseUrl}/contests/${sport}/${date}`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    return processFantasyData(data, site);
}
function processFantasyData(data, _site) {
    // Process the raw API response into our standardized format;


    return players.map((player) => {

        return {
            playerId: playerData.id,
            playerName: playerData.name,
            team: playerData.team,
            position: playerData.position,
            salary: playerData.salary,
            projectedPoints: playerData.projectedPoints, actualPoints: playerData.actualPoints,
            ownershipPercentage: playerData.ownershipPercentage,
        };
    });
}
