// commands/info/help.js
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of available commands.',
    usage: '!help',
    execute(message, args) {
        const embed = new EmbedBuilder()
            .setTitle('Woc Bot - Help')
            .setColor(0x00AE86)
            .setDescription('Here are the available commands:')
            .addFields(
                { name: '/teaminfo <TeamName>', value: 'Displays information about a specific team.', inline: false },
                { name: '/teamlist', value: 'Shows a paginated list of teams sorted by score.', inline: false },
                { name: '/log_request <Type> <Player> <Team>', value: 'Logs a specific type of request to the staff channel.', inline: false },
                { name: '/log_punishment <Action> <Player> <Reason> [Duration]', value: 'Logs staff punishments for a player.', inline: false },
                { name: '/war_request <RequestingTeam> <TargetTeam> <Player>', value: 'Sends a war/raid request to the staff channel.', inline: false },
            )
            .setFooter({ text: 'Woc Bot © 2024' })
            .setTimestamp();
        
        message.channel.send({ embeds: [embed] });
    },
};
