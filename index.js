require("dotenv").config();
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const { BOT_PREFIX, DISCORD_TOKEN } = process.env;

console.log(DISCORD_TOKEN);

const client = new Client();

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
console.log(commandFiles);
const cooldowns = new Collection();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return;

  let args = message.content.slice(BOT_PREFIX.length).trim().split(/ +/g);

  const commandName = args.shift().toLowerCase();

  let command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  let reply;

  if (!command.name == "dump" && command.args && !args.length) {
    reply = `You didn't provide any command arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    console.log(args[0]);
    await command.execute(message, client, args);
  } catch (error) {
    console.error(error.stack);
    message.reply(reply);
  }
});

client.login(DISCORD_TOKEN).catch((err) => console.error(err.stack));
