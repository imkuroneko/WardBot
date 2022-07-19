const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    execute(guild) {
        guild.user.setActivity("los mensajes enviados", { type: ActivityType.Watching });
    }
};
