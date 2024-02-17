const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("verif").setDescription("Verify age user"),
  async execute(message, args, client) {
    if (message.channel.parent.id !== "1060944448902660227") return;

    const [month, year] = args;

    if (!month || !year || args.length === 3) {
      return message.reply(
        "Format salah: contoh penulisan command: `verif januari 1970`\nIncorrect format: example of writing command: `verif january 1970`"
      );
    }

    const legalRole = message.guild.roles.cache.find((r) => r.id === "1060236772501635174");
    const adminRole = message.guild.roles.cache.find((r) => r.id === "877472634546319380");

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const userYear = parseInt(year);
    const userMonth = new Date(`${year} ${month}`).getMonth() + 1;

    let age = currentYear - userYear;

    if (currentMonth < userMonth) age--;

    if (age >= 17) {
      if (legalRole) {
        message.member.roles
          .add(legalRole)
          .then(() => {
            message.channel.send(
              `
              Role ${legalRole} sudah diberikan\nRole ${legalRole} has been assigned\n\n` +
                "Silakan tutup channel ini dengan command ```-ticket close verifikasi selesai```" +
                "Please close this channel with the command ```-ticket close verification complete```"
            );
          })
          .catch((error) => {
            console.log(error);
            message.channel.send(
              `Terjadi kesalahan saat menambahkan role. Role gagal diberikan. Silakan tag admin ${adminRole} untuk informasi lebih lanjut\n` +
                `An error occurred while adding the role. Role failed to assign. Please tag admin ${adminRole} for more information`
            );
          });
      } else {
        message.channel.send(
          `Terjadi kesalahan saat memberi role. Silakan tag admin ${adminRole}\n` +
            `An error occurred while assigning a role. Please tag admin ${adminRole}`
        );
      }
    } else {
      message.channel.send(
        `Umur Anda belum mencukupi untuk mendapatkan role ${legalRole}. silakan verifikasi kembali ketika umur anda sudah 17 tahun\n` +
          `You are not old enough to get the role ${legalRole}. Please verify again when you are 17 years old`
      );
    }
  },
};
