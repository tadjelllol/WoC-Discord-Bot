// events/interactionCreate.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isButton()) return;

        const { customId } = interaction;
        const user = interaction.user;

        // Fetch staff role name from config
        const staffRoleName = client.config.staffRoleName;

        const member = await interaction.guild.members.fetch(user.id);
        if (!member.roles.cache.some(role => role.name === staffRoleName)) {
            return interaction.reply({ content: 'You do not have permission to perform this action.', ephemeral: true });
        }

        if (customId === 'accept') {
            await interaction.reply({ content: 'The war/raid request has been accepted.', ephemeral: true });
            // Add additional logic for accepting the request (e.g., notifying teams, updating scores)
        } else if (customId === 'deny') {
            await interaction.reply({ content: 'The war/raid request has been denied.', ephemeral: true });
            // Add additional logic for denying the request
        }
    },
};
