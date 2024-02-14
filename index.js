require("dotenv").config();

const { token, globalPrefix } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { readdirSync } = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];
client.prefix = globalPrefix;

const functionFolder = readdirSync(`./src/functions`);

for (const folder of functionFolder) {
  const functionFiles = readdirSync(`./src/functions/${folder}`).filter((file) => file.endsWith(".js"));

  for (const file of functionFiles) require(`./src/functions/${folder}/${file}`)(client);
}

client.login(token);
