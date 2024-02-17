module.exports = {
  data: {
    name: `verif-button`,
  },
  async execute(interaction) {
    if (interactionCreate.channelId !== "") return;

    const role = interaction.guild.roles.cache.find((r) => r.id === "");

    if (!role) return interaction.reply("Invalid role");

    const member = interaction.member;
    const hasRole = member.roles.cache.has(role.id);

    if (hasRole) return interaction.reply(`You already have the ${role.name} role`);

    try {
      await member.roles.add(role);
      return interaction.reply(`You have been given the ${role.name} role`);
    } catch (error) {
      console.error(error);
      return interaction.reply("An error occurred while giving the role");
    }
  },
};
