const { sendEmbed } = require("../utils/pornhubApi");
module.exports = {
  name: "pornhub video",
  aliases: ["ph"],
  description: "get URL of a pornhub video by query",
  args: true,
  cooldown: 4,

  execute: async (message, client, args) => {
    let query = args.length > 1 ? args.join(" ") : args[0];
    let search = !query ? "taboo" : query;

    if (search.length >= 1) {
      console.log({ search });
      sendEmbed(message, search);
    } else {
      message.reply("parametres de recherche manquants");
    }
  },
};
