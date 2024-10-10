// commands/war/war_request.js
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'war_request',
    description: 'Sends a war/raid request to the staff channel.',
    usage: '/war_request <RequestingTeam> <TargetTeam> <Player>',
    async execute(message, args, client) {
        console.log('Executing war_request command...');
        const [requestingTeam, targetTeam, player] = args;
        if (!requestingTeam || !targetTeam || !player) {
            console.log('Insufficient arguments for war_request.');
            return message.channel.send('Usage: `/war_request <RequestingTeam> <TargetTeam> <Player>`');
        }

        const staffChannel = client.channels.cache.get(process.env.STAFF_CHANNEL_ID);
        if (!staffChannel) {
            console.log('Staff channel not found.');
            return message.channel.send('Staff channel not found.');
        }

        const embed = new EmbedBuilder()
            .setTitle('War/Raid Request')
            .setColor(0xFF0000) // Red color in hex
            .addFields(
                { name: 'Requesting Team', value: requestingTeam, inline: false },
                { name: 'Target Team', value: targetTeam, inline: false },
                { name: 'Player', value: player, inline: false }
            )
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('accept')
                    .setLabel('Accept')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('deny')
                    .setLabel('Deny')
                    .setStyle(ButtonStyle.Danger)
            );

        try {
            await staffChannel.send({ embeds: [embed], components: [row] });
            console.log('War/Raid request sent to staff.');
            message.channel.send('War/Raid request sent to staff.');
        } catch (error) {
            console.error('Error sending war_request:', error);
            message.channel.send('Failed to send the war/raid request.');
        }
    },
};
