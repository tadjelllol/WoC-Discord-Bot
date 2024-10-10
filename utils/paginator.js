// utils/paginator.js
const { EmbedBuilder } = require('discord.js');

class Paginator {
    constructor(message, items, itemsPerPage = 5, embedTitle = 'List', embedColor = 0x00FF00, timeout = 60000) {
        this.message = message;
        this.items = items;
        this.itemsPerPage = itemsPerPage;
        this.embedTitle = embedTitle;
        this.embedColor = embedColor;
        this.timeout = timeout;
        this.currentPage = 0;
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
    }

    generateEmbed() {
        const start = this.currentPage * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const currentItems = this.items.slice(start, end);

        const embed = new EmbedBuilder()
            .setTitle(this.embedTitle)
            .setColor(this.embedColor)
            .setFooter({ text: `Page ${this.currentPage + 1} of ${this.totalPages}` });

        currentItems.forEach((item, index) => {
            embed.addFields({ name: item.name, value: item.value, inline: false });
        });

        return embed;
    }

    async paginate() {
        const embed = this.generateEmbed();
        const embedMessage = await this.message.channel.send({ embeds: [embed] });

        if (this.totalPages <= 1) return;

        await embedMessage.react('⬅️');
        await embedMessage.react('➡️');

        const filter = (reaction, user) => {
            return ['⬅️', '➡️'].includes(reaction.emoji.name) && !user.bot;
        };

        const collector = embedMessage.createReactionCollector({ filter, time: this.timeout });

        collector.on('collect', (reaction, user) => {
            reaction.users.remove(user).catch(console.error);

            if (reaction.emoji.name === '⬅️') {
                if (this.currentPage > 0) {
                    this.currentPage--;
                    embedMessage.edit({ embeds: [this.generateEmbed()] });
                }
            } else if (reaction.emoji.name === '➡️') {
                if (this.currentPage < this.totalPages - 1) {
                    this.currentPage++;
                    embedMessage.edit({ embeds: [this.generateEmbed()] });
                }
            }
        });

        collector.on('end', () => {
            embedMessage.reactions.removeAll().catch(console.error);
        });
    }
}

module.exports = Paginator;
