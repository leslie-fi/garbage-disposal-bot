const { BOT_PREFIX } = require("dotenv").config();
const DumpCommand = require("../dumpCmd");
module.exports = {
  name: "dump",
  aliases: ["rm", "prune", "delete", "clear", "gd"],
  description: "TRASH",
  args: true,
  cooldown: 4,

  execute: async (message, client, args) => {
    const user = message.mentions.users.first();
    // Parse Amount
    let amount = !!+args[0] ? +args[0] : 100;
    console.log(amount, args, message.content.split(" ")[1]);

    if (!amount) return message.reply("Must specify an amount to delete!");
    if (!amount && !user)
      return message.reply(
        "Must specify a user and amount, or just an amount, of messages to purge!"
      );

    try {
      if (message.deletable) message.delete();

      const fetched = await message.channel.messages.fetch({
        limit: amount++,
      });

      await message.channel.bulkDelete(fetched);
      await message.channel
        .send(`Cleared ${amount} messages of evidence. The abyss is empty`)
        .then((msg) => msg.delete({ timeout: 5000 }));
    } catch (error) {
      console.error(error.stack);
      return message.reply(
        `Shit an error occurred! I couldnt delete messages because of:\n ${error}`
      );
    }
  },
};
