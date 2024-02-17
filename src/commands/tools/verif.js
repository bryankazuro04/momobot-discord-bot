const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("verif").setDescription("Verify age user"),
  async execute(message, args, client) {
    if (message.channel.parent.id !== "908174988580900904") return;

    const [month, year] = args;

    if (!month || !year) return message.reply("Format salah: contoh penulisan command: `verif januari 1970`");

    const role = message.guild.roles.cache.find((r) => r.id === "1177633930824929480");

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const userYear = parseInt(year);
    const userMonth = new Date(`${year} ${month}`).getMonth() + 1;

    let age = currentYear - userYear;

    if (currentMonth < userMonth) age--;

    if (age >= 17) {
      if (role) {
        message.member.roles
          .add(role)
          .then(() => {
            message.channel.send(`Role ${role} sudah diberikan`);
            message.channel.send(`Role ${role} has been assigned`);
          })
          .catch((error) => {
            console.log(error);
            message.channel.send(`Terjadi kesalahan saat menambahkan role. Role gagal diberikan`);
            message.channel.send(`An error occurred while adding the role. Role failed to assign`);
          });
      } else {
        message.channel.send("Terjadi kesalahan saat memberi role. Silakan tag admin Jenderal Momo");
        message.channel.send("An error occurred while assigning a role. Please tag admin General Momo");
      }
    } else {
      message.channel.send(
        `Umur Anda belum mencukupi untuk mendapatkan role ${role}. silakan verifikasi kembali ketika umur anda sudah 17 tahun`
      );
      message.channel.send(
        `You are not old enough to get the role ${role}. Please verify again when you are 17 years old`
      );
    }
  },
};
