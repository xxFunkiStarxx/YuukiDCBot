const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Ticket System')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
    
    async execute(interaction, client) {
        
        const TicketEmbed = new EmbedBuilder()
        .setColor('Red')
        .setFooter({text: 'test'})
        .setTitle('Ticket System')
        .setDescription('Hello this is a Test Ticket System')
        
        const TicketButton = new ButtonBuilder()
        .setCustomId('ticket')
        .setLabel('Open a Ticket!')
        .setStyle(ButtonStyle.Primary);

        await interaction.reply({embeds: [TicketEmbed], components: [new ActionRowBuilder().addComponents(TicketButton)], ephemeral: false, fetchReply: true})
    }
}