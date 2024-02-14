module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.content.slice(0, 5) === "verif") {
      if (message.author.bot) return;

      const args = message.content.trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName);

      if (!command) return;

      try {
        await command.execute(message, args, client);
      } catch (error) {
        console.error(error);
        message.reply("An error occurred while executing the command");
      }
    } else {
      if (!message.content.startsWith(client.prefix) || message.author.bot) return;

      const args = message.content.slice(client.prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName);

      if (!command) return;

      try {
        await command.execute(message, args, client);
      } catch (error) {
        console.error(error);
        message.reply(
          "An error occurred while executing the command\n\nAda yang salah dengan command dengan prefixnya"
        );
      }
    }
  },
};
