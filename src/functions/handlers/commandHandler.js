const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { readdirSync } = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = readdirSync(`./src/commands`);

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"));
      const { commands, commandArray } = client;

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);

        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const { token, clientId, guildId } = process.env;
    const rest = new REST({ version: 10 }).setToken(token);

    try {
      console.log("Started refreshing application (/) commands");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });

      console.log("Successfully reloaded application (/) commands");
    } catch (error) {
      console.error(error);
    }
  };
};
