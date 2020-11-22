const {BOT_PREFIX} = require('dotenv').config()
const DumpCommand = require('../dumpCmd')
module.exports = {
  name: 'dump',
  aliases: ['rm',
  'prune', 'delete', 'clear', 'gd'],
  description: 'TRASH',
  args: true,
  cooldown: 4,
  
  execute: async (message, client, args) => {
    const user = message.mentions.users.first();
    // Parse Amount
    let amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : 100
    console.log(amount,args, message.content.split(' ')[1])
    // let amount = args[0] ? parseInt(args[0]) : parseInt(args[1])
    if (!amount) return message.reply('Must specify an amount to delete!');
    if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
    // Fetch 100 messages (will be filtered and lowered up to max amount requested)
    // let log = (m) => console.log(m)
    async function fetched() {
      let yes = await message.channel.messages.fetch({limit: 100})
      let messages = await yes.filter(m => m).array().slice(0, amount)
   
    // await log(messages.keys().size())
    try {
    //  if (user) {
    //  const filterBy = user ? user.id : client.user.id;
    //  messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
    //  }
     await message.channel.bulkDelete(messages)
     await message.channel.send(`Cleared ${amount} messages of evidence. The abyss is empty`)
     } catch (error) {

      console.error(error.stack)
      return message.reply(`Shit an error occurred! You can only bulk delete messages that are under 14 days old ={`)
  }
}
fetched()
    // try{
      // const user = message.mentions.users.first();
      // // Parse Amount
      // const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]) || parseInt('50')
      // // const amount = args[0] ? parseInt(args[0]) : parseInt(args[1])
      // if (!amount) return message.reply('Must specify an amount to delete!');
      // if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
      // // Fetch 100 messages (will be filtered and lowered up to max amount requested)
      // message.channel.messages.fetch({
      //  limit: 100,
      // }).then((messages) => {
      //   console.log(messages)
      //  if (user) {
      //  const filterBy = user ? user.id : Client.user.id;
      //  messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
      //  }
      //  message.channel.bulkDelete(messages)
      //  .then(() => {
      //    message.channel.sent(`Cleared ${amount} messages of evidence. The abyss is empty`)
      //  }).catch(error => {
      //   console.error(error.stack)
      //   return message.reply(`Shit an error occurred`)
      //   });
      // }).catch(error => {
      //   console.error(error.stack)
        
      // })
    // } catch (err) ?
//     const user = message.mentions.users.first();
// // Parse Amount
// const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
// if (!amount) return message.reply('Must specify an amount to delete!');
// if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
// // Fetch 100 messages (will be filtered and lowered up to max amount requested)
// message.channel.messages.fetch({
//  limit: 100,
// }).then((messages) => {
//  if (user) {
//  const filterBy = user ? user.id : Client.user.id;
//  messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
//  }
//  message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
// }).catch(error =>console.error)
// ;
//   }
// }
      // Our standard argument/command name definition.
  // const args = message.content.slice(BOT_PREFIX.length).trim().split(/ +/g);
  // const command = args.shift().toLowerCase();

  // // Grab the command data from the client.commands Enmap
  // const cmd = client.commands.get(command);
  // // let amount = parseInt(args[0]) + 1;
  // let amount = '100'
  // if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`You don't have permissions to manage the server, SRY`)
  // // return message.reply('How many messages do you want to dump into the abyss?')
  
  //   if (isNaN(amount)) {
  //     return message.reply('that doesn\'t seem to be a valid number.');
  //   }  else if (amount <= 1 || amount > 100) {
  //     return message.reply('you need to input a number between 1 and 100.');
  //   }



  // message.channel.bulkDelete(amount).then(() => {
  //   message.channel.send(`Cleared ${amount} messages of evidence. The channel is born anew`)
  // }).catch(err => {
  //   console.error(err)
  //   return message.reply(`Shit an error occurred`)
  // })
}
} 
