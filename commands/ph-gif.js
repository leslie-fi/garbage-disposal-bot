const { sendGif } = require("../utils/pornhubApi");
module.exports = {
  name: "pornhub gif",
  aliases: ["ph-gif"],
  description: "get URL of a pornhub video by query",
  args: true,
  cooldown: 4,

  execute: async (message, client, args) => {
    let query = args.length > 1 ? args.join(" ") : args[0];
    let search = !query ? "femdom" : query;

    if (search.length >= 1) {
      console.log({ search });
      sendGif(message, search);
    } else {
      message.reply("parametres de recherche manquants");
    }
  },
};
