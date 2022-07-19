module.exports = {
    name: 'ready',
    execute(guild) {
        guild.user.setActivity("los mensajes enviados", { type: "WATCHING" });
    }
};