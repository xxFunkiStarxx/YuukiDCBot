function loadElements(client) {
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii().setHeading('Elements', 'Status');

    const folders = fs.readdirSync('./Collection/Elements')
    for (const folder of folders) {
        const files = fs.readdirSync(`./Collection/Elements/${folder}`).filter((file) => file.endsWith(".js"));

        for (const file of files) {
            const button = require(`../Elements/${folder}/${file}`);
            const menu = require(`../Elements/${folder}/${file}`);
    
                const { buttons, selectMenus } = client;
                buttons.set(button.data.name, button);
                selectMenus.set(menu.data.name, menu);
                
            table.addRow(file, "loaded")
            continue;
        }
        
        
    }
    return console.log(table.toString(), "\n> Elements Loaded!")
}

module.exports = {loadElements};