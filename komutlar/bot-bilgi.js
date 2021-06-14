const Discord = require("discord.js");
const db = require("croxydb");
const moment = require("moment");
require("moment-duration-format");
module.exports.run = async (bot, message) => {
  try {
    let kontrol = await db.fetch(`dil_${message.guild.id}`);
    //let shardi = bot.shard.id + 1;

    const duration = moment
      .duration(bot.uptime)
      .format("D [gün], H [saat], m [dakika], s [saniye]");
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .addField(`Versiyon`, `0.1`, true)
      .addField(`Aktiflik Süresi`, duration, true)
      .addField(`Sunucular`, bot.guilds.size.toLocaleString(), true)
      .addField(
        `Kullanıcılar`,
        bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
        true
      )
      .addField(`Gecikme`, bot.ping + "ms", true)
      .addField(
        `Ram Kullanımı`,
        `%${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`,
        true
      )
      //.addField(`Toplam Shard`, bot.shard.count, true)
      //.addField(`Bulunduğum Shard`, shardi, true)
      //.addField(`Genel Shard`, `${shardi}/${bot.shard.count}`, true)
      .addField(`Destek Sunucusu`, `[Tıkla!](https://discord.gg/WWhEu2f`, true)
      .addField(
        `Botu Ekleyin`,
        `[Tıkla!](https://discordapp.com/oauth2/authorize?client_id=615075430445088773&scope=bot&permissions=8)`,
        true
      )
      .addField(`Bota Oy Verin`, `YAKINDA`, true)
      .setFooter(bot.user.username, bot.user.avatarURL);
    message.channel.send(embed);
  } catch (err) {
    const ayarlar = require("../ayarlar.json");
    const embed = new Discord.RichEmbed()
      .setDescription(
        `Sanırım bir sorun var! Bunu yetkililere bildir!\nDestek Sunucusu: [Tıkla!](${ayarlar.sunucun})`
      )
      .setColor("RED")
      .setTimestamp();
    message.channel.send(embed);
  }
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bot-info"],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "bot-bilgi",
  description: "bot-bilgi",
  usage: "bot-bilgi"
};
