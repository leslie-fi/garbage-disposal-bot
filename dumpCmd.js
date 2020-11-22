module.exports = (message, client, args) => {
const user = message.mentions.users.first();
// Parse Amount
let amount = !!parseInt(message.content.split(' ')[2]) ? parseInt(message.content.split(' ')[2]) : 2
console.log(amount,args, message.content.split(' ')[2])
// let amount = args[0] ? parseInt(args[0]) : parseInt(args[1])
if (!amount) return message.reply('Must specify an amount to delete!');
if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
// Fetch 100 messages (will be filtered and lowered up to max amount requested)
message.channel.messages.fetch().then((messages) => {
 if (user) {
 const filterBy = user ? user.id : client.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 
 message.channel.bulkDelete(messages)
 .then(() => {
   message.channel.send(`Cleared ${amount} messages of evidence. The abyss is empty`)
 }).catch(error => {
  console.error(error.stack)
  return message.reply(`Shit an error occurred! You can only bulk delete messages that are under 14 days old ={`)
  });
}).catch(error => {
  console.error(error.stack)
  
})
}