const {ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits, ButtonBuilder, ButtonStyle, Embed} = require('discord.js')

module.exports = {
    data: {
        name: `ticket`
    },
    async execute(interaction, client) {

        const modal = new ModalBuilder({
            customId: `Report from - ${interaction.user.id}`,
            title: '(Servername) Report System',
        });

        const ReportPlayerInput = new TextInputBuilder({
            customId: `playerreport`,
            label: 'Who would you like to report?',
            style: TextInputStyle.Short,
        });
        const ReportReasonInput = new TextInputBuilder({
            customId: `reasonreport`,
            label: 'Why do you report him/her?',
            style: TextInputStyle.Short,
        });
        const DescriptionInput = new TextInputBuilder({
            customId: `descriptionreport`,
            label: 'Please briefly describe the situation to us!',
            style: TextInputStyle.Paragraph,
        });

        const firstActionRow = new ActionRowBuilder().addComponents(ReportPlayerInput);
        const secondActionRow = new ActionRowBuilder().addComponents(ReportReasonInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(DescriptionInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

        await interaction.showModal(modal)

        const filter = (interaction) => interaction.customId === `Report from - ${interaction.user.id}`;

        console.log(interaction.customId)
        console.log(interaction.customId === `Report from - ${interaction.user.id}`)

        await interaction.awaitModalSubmit({ filter, time: 50_000 }).then(async (modalInteraction) => {
            
            const createCat = '994207425345376256'
            const user = interaction.user
            const channel = await interaction.guild.channels.create({
                name: `ticket - ${user.tag}`,
                type: ChannelType.GuildText,
                parent: createCat,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id, //Guild
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: interaction.user.id, //User - Ticket User
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.UseExternalEmojis]
                    },
                    {
                        id: '993988711714918473', //User - Admin User
                        allow: [PermissionFlagsBits.AddReactions, PermissionFlagsBits.ManageMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.UseExternalEmojis]
                    },
                    {
                        id: '1051502781351075951', //User - Manager User
                        allow: [PermissionFlagsBits.AddReactions, PermissionFlagsBits.ManageMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.UseExternalEmojis]
                    },
                    {
                        id: '994551615979786353', //User - Mod User
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.AddReactions]
                    },
                ]
            });

        const update2 = '0.0.31'    
        const PlayerValue = modalInteraction.fields.getTextInputValue('playerreport')
        const ReportValue = modalInteraction.fields.getTextInputValue('reasonreport')
        const DescribValue = modalInteraction.fields.getTextInputValue('descriptionreport')

        const ModalEmbed = new EmbedBuilder()
        .setTitle("Report")
        .setColor("#b496f3")
        .addFields({name: `**Who would you like to report?**`, value: PlayerValue})
        .addFields({name: `**Why do you report him/her?**`, value: ReportValue})
        .addFields({name: `**Situation:**`, value: DescribValue})
        .setTimestamp()
        .setFooter({text: `Report from: ${interaction.user.tag}`})

        const NewChannelEmbed = new EmbedBuilder()
        .setDescription(`Your Ticket has been created in ${channel}`)
        .setColor('Aqua')
        .setFooter({text: `InteractionInfo - v.${update2}`})

        const InsideTicketEmbed = new EmbedBuilder()
        .setTitle(`Ticket System`)
        .setDescription(`Hello, ${interaction.user}.`)
        .addFields({name: '**Ticket Rules**', value: `- Please briefly write us / or send any proof inside this channel, so we can help you faster and better.\n- It is forbidden to abuse the ticketsystem, otherwise u gets banned to use this system.\n>** Do not ping any staff/support member**\n- Our support Team gots pinged, we'll help you as fast as we can.\n\n- Thanks for your attention!\n`})
        .addFields({name: '**Support Team**', value: `<Role ID's>`})
        .setTimestamp()
        .setColor('#b496f3')
        .setFooter({text: `Ticket System - v.${update2}`})

        const CloseReportButton = new ButtonBuilder()
        .setCustomId('closeticket')
        .setLabel('Close')
        .setStyle(ButtonStyle.Danger)

        const HelpTicketButton = new ButtonBuilder()
        .setCustomId('helpticket')
        .setLabel('Help')
        .setStyle(ButtonStyle.Secondary)

        await modalInteraction.reply({embeds: [NewChannelEmbed], ephemeral: true});
        await modalInteraction.guild.channels.cache.get(channel.id).send({embeds: [InsideTicketEmbed], components: [new ActionRowBuilder().addComponents([CloseReportButton, HelpTicketButton])], ephemeral: false, fetchReply: true, content: `Here throws the staff ping`})
        const NewReaction = await modalInteraction.guild.channels.cache.get(channel.id).send({embeds: [ModalEmbed], ephemeral: false, fetchReply: true})
        NewReaction.react('<:check:994559359814209536>')

        
    })

        
        //await interaction.reply({
        //    content: "Hello World. I'm alive >:D"
        //})
    }
}
