// commands/list/teamlist.js
const { EmbedBuilder } = require('discord.js');
const Paginator = require('../../utils/paginator');

module.exports = {
    name: 'teamlist',
    description: 'Displays a paginated list of teams sorted by score.',
    usage: '/teamlist',
    async execute(message, args, client) {
        // Placeholder data for teams
        const teams = [
            { name: "#1 TeamA", value: "Score: 100" },
            { name: "#2 TeamB", value: "Score: 80" },
            { name: "#3 TeamC", value: "Score: 60" },
            { name: "#4 TeamD", value: "Score: 40" },
            { name: "#5 TeamE", value: "Score: 20" },
            { name: "#6 TeamF", value: "Score: 10" },
            { name: "#7 TeamG", value: "Score: 5" },
            { name: "#8 TeamH", value: "Score: 3" },
            { name: "#9 TeamI", value: "Score: 2" },
            { name: "#10 TeamJ", value: "Score: 1" },
            // Add more teams as needed
        ];

        // Sort teams by score in descending order
        teams.sort((a, b) => {
            const scoreA = parseInt(a.value.split(': ')[1]);
            const scoreB = parseInt(b.value.split(': ')[1]);
            return scoreB - scoreA;
        });

        const paginator = new Paginator(
            message,
            teams,
            5, // items per page
            'Top Teams', // embed title
            0x00FF00, // embed color (green)
            60000 // timeout in ms (1 minute)
        );

        await paginator.paginate();
    },
};

