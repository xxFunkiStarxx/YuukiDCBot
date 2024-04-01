const {ChatInputCommandInteraction, CommandInteraction, transformResolved, EmbedBuilder} = require("discord.js")

//module.exports = {
//    name: "interactionCreate",
//    /**
//    * 
//     * @param {ChatInputCommandInteraction} interaction;
//    */
//
//    execute(interaction, client) {
//        if(!interaction.isChatInputCommand()) return;
//
//       const command = client.commands.get(interaction.commandName);
//        if(!command)
//        return interaction.reply({
//            content: "This command is outdated",
//            ephemeral: true
//        });
//
//        command.execute(interaction, client)
//    }
//
//}

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {                                               // Command Interaction
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command)
            return;

            const InteractionErrorEmbed = new EmbedBuilder()
            .setDescription("This Command is outdated or not available!")
            .setFooter({text: "InteractionError"})
            .setTimestamp()
            .setColor('DarkRed')
            try {
                await command.execute(interaction, client);
            } catch (err) {
                console.error(err);
                await interaction.reply({embeds: [InteractionErrorEmbed], ephemeral: true});
            }
        } 
        else if (interaction.isButton()) {                                                    // Button Interaction
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if (!button) return new Error('There is no code for this button.');

            const ButtonErrorEmbed = new EmbedBuilder()
            .setDescription("Error while trying to reach the EmbedConstructor!")
            .setFooter({text: "InteractionError"})
            .setTimestamp()
            .setColor('DarkRed')

            try {
                await button.execute(interaction, client);
            } catch (err) {
                console.error(err);
                await interaction.reply({embeds: [ButtonErrorEmbed], ephemeral: true});
            }
        }
        else if (interaction.isStringSelectMenu()) {                                                // Select Menu Interaction
            const { selectMenus } = client;
            const { customId } = interaction;
            const menu = selectMenus.get(customId);
            if (!menu) return new Error('There is no code for this select menu.');

            const MenuErrorEmbed = new EmbedBuilder()
            .setDescription("Error while trying to reach the MenuConstructor!")
            .setFooter({text: "InteractionError"})
            .setTimestamp()
            .setColor('DarkRed')

            try {
                await menu.execute(interaction, client);
            } catch (err) {
                console.error(err);
                await interaction.reply({embeds: [MenuErrorEmbed], ephemeral: true});
            }
        }
        else if (interaction.isModalSubmit()) {
            console.log('Got a modal!');}
    }
}