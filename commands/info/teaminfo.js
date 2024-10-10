// commands/info/teaminfo.js
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'teaminfo',
    description: 'Displays information about a specific team.',
    usage: '!teaminfo <TeamName>',
    execute(message, args) {
        const teamName = args[0];
        if (!teamName) {
            return message.channel.send('Please provide a team name. Usage: `!teaminfo <TeamName>`');
        }

        // Placeholder data
        const teams = {
            "TeamA": { members: ["test", "test"], score: 100 },
            "TeamB": { members: ["test", "test"], score: 80 },
            "TestTeam": {members: ["test1", "Test2", "Test3", "Test4"], score: 200}
            
        };

        const team = teams[teamName];
        if (team) {
            const embed = new EmbedBuilder()
                .setTitle(`Team: ${teamName}`)
                .setColor(0x0000FF) // BLUE color in hex
                .addFields(
                    { name: 'Members', value: team.members.join(', '), inline: false },
                    { name: 'Score', value: team.score.toString(), inline: false }
                );

            message.channel.send({ embeds: [embed] });
        } else {
            message.channel.send('Team not found.');
        }
    },
};
