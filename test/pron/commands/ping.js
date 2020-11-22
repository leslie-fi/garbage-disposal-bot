module.exports.run = async (bot, message, args) => {
  const msg = await message.channel.send('PING??');
  msg.edit(`PONG! ${msg.createdTimestamp - message.createdTimestamp} ms`)
}

module.exports.help = {
  name: 'ping',
  aliases: ['p']
}