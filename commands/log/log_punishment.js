// commands/log/log_punishment.js
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'log_punishment',
    description: 'Logs staff punishments for a player.',
    usage: '/log_punishment <Action> <Player> <Reason> [Duration]',
    async execute(message, args, client) {
        const [action, player, ...reasonParts] = args;
        let reason = reasonParts.join(' ');
        let duration = 'N/A';

        // Extract duration if the action is mute or ban
        if (['mute', 'ban'].includes(action.toLowerCase())) {
            const durationMatch = reason.match(/for (\d+[smhd])/i);
            if (durationMatch) {
                duration = durationMatch[1];
                reason = reason.replace(/for (\d+[smhd])/i, '').trim();
            }
        }

        if (!action || !player || !reason) {
            return message.channel.send('Usage: `/log_punishment <Action> <Player> <Reason> [Duration]`');
        }

        const staffChannel = client.channels.cache.get(process.env.STAFF_CHANNEL_ID);
        if (!staffChannel) {
            return message.channel.send('Staff channel not found.');
        }

        const logMessage = `[staff][${action}] ${player}. Reason: ${reason}` + (duration !== 'N/A' ? ` for ${duration}.` : '.');

        try {
            await staffChannel.send(logMessage);
            message.channel.send('Punishment logged successfully.');
        } catch (error) {
            console.error(error);
            message.channel.send('Failed to log the punishment.');
        }
    },
};
