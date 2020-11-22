module.exports.run = async (bot, message, args) => {
  const amount = parseInt(args[0]) + 1;
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`You don't have permissions to manage the server, SRY`)
  if (!args[0]) return message.reply('How many messages do you want to dump into the abyss?')
  
    if (isNaN(amount)) {
      return message.reply('that doesn\'t seem to be a valid number.');
    }  else if (amount <= 1 || amount > 100) {
      return message.reply('you need to input a number between 1 and 100.');
    }



  message.channel.bulkDelete(parseInt(args[0]) + 1).then(() => {
    message.channel.send(`Cleared ${args[0]} messages of evidence. The channel is born anew`)
  }).catch(err => {
    console.error(err)
    return message.reply(`Shit an error occurred! You can only bulk delete messages that are under 14 days old ={`)
  })
} 

module.exports.help = {
  name: 'dump',
  aliases: ['rm', 'delete', 'clear', 'gd']
}