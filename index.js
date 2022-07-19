// Load configuration files ================================================================================================
const { token } = require('./data/bot.json');

// Load required resources =================================================================================================
const fs = require('fs');
const { Client, GatewayIntentBits, Partials } = require('discord.js');

// Define client Intents ===================================================================================================
const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent ],
    partials: [ Partials.Channel, Partials.Message, Partials.User ]
});


// Handle :: Events ========================================================================================================
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for(const file of events) {
    const eventName = file.split('.')[0];
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args));
}

// Define token a init bot =================================================================================================
client.login(token);