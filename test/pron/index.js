const {Client, Collection} = require('discord.js');
const bot = new Client({disableEveryone: true});
const fs = require('fs');
const botconfig = {
  "token": "Nzc1MTQwNzg3NDE4NjkzNjQy.X6iAHQ.VugYwhY2plznQMHmSJ-n5BXhONQ",
  "prefix": "ph!"
}

bot.commands = new Collection()
bot.aliases = new Collection()

fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);

  let jsFile = files.filter(f => f.split('.').pop() === 'js')
  if (jsFile.length <= 0) {
    console.log(`Couldn't locate any commands =(`);
    return;
  }

  jsFile.forEach(cmd => {
    let props = require(`./commands/${cmd}`)
    console.log(`${cmd} loaded!!`)
    bot.commands.set(props.help.name, props)

    props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name)
    })
  })
})
bot.on('ready', async () => {
  console.log({bot})
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers`)
  bot.user.setActivity(`with ${bot.guilds.size} servers!!`)
  console.log(`${bot.guilds}, ${bot.guilds.size}`)
} )

bot.on('message', async message => {
  
  if (message.channel.type === 'dm') return;
  if (message.author.bot) return;

  let prefix = botconfig.prefix;
  
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.slice(prefix.length).trim()
  let cmd;
  cmd = args.shift().toLowerCase()
  let command;
  let commandFile = bot.commands.get(cmd.slice(prefix.length))
  if (commandFile) commandFile.run(bot, message, args);

  if (bot.commands.has(cmd)) {
    command = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    command = bot.commands.get(bot.aliases.get(cmd));
  }

  try {
    command.run(bot, message, args)
  } catch (e) {
    return;
  }
})
bot.login(botconfig.token)