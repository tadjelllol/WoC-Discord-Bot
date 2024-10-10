module.exports = {
    name: 'log_request',
    description: 'Logs a request to the staff channel.',
    usage: '!log_request <Type> <Player> <Team>',
    async execute(message, args, client) {
        const [type, player, team] = args;
        if (!type || !player || !team) {
            return message.channel.send('Usage: `!log_request <Type> <Player> <Team>`');
        }

        const staffChannel = client.channels.cache.get(process.env.STAFF_CHANNEL_ID);
        if (!staffChannel) {
            return message.channel.send('Staff channel not found.');
        }

        const logMessage = `[${type}] request has been sent by ${player} from team ${team}.`;
        try {
            await staffChannel.send(logMessage);
            message.channel.send('Request logged successfully.');
        } catch (error) {
            console.error(error);
            message.channel.send('Failed to log the request.');
        }
    },
};
