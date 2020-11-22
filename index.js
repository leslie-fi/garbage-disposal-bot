require('dotenv').config()
const {Client, MessageEmbed, Message, Collection} = require('discord.js');
const fs = require('fs');
const Pornhub = require('@justalk/pornhub-api');
// const {prefix, token} = require('./botconfig.json')

const {DISCORD_TOKEN, BOT_PREFIX} = process.env;


const client = new Client();


async function pornhubSearch(searched){
	let contentList;
	try {
		contentList = await Pornhub.search(searched, " ",{page: 3});
		if (!contentList.results) contentList = await Pornhub.search("weirdchamp", " ",{page: 3});
		console.log(contentList.results)
	} catch (e) {
		console.error(e.stack)
	}

	var alea = Math.floor((Math.random() * contentList.results.length-1));

	var link = contentList.results[alea].link;

	const page = await Pornhub.page(link, ['title', 'description', 'thumbnail_url']);

	const embed = new MessageEmbed()
		.setTitle(page.title)
		.setURL(link)
		.setDescription(page.description)
		.setColor([98,26,62])
		.setThumbnail(page.thumbnail_url)

	return embed;
}

async function pornhubSearchGif(searched='weirdchamp'){
	let contentList;
	try {
		contentList = await Pornhub.search(searched, ["title"], {search: 'gifs', page: 3});
		if (!contentList.results) contentList = await Pornhub.search("weird", ["title"], {search: 'gifs', page: 3});
	console.log(contentList.results)

	} catch (e) {
		console.error(e.stack)
	}

	const msg = new Message();

	
	var alea = Math.floor((Math.random() * contentList.results.length-1));
	
	const content =  contentList.results[alea].link_mp4;
	if (!content){
		content  = contentList.result[alea].link_webm;
	}
	
	
	msg.content = content
	console.log(msg)
	return msg;
	//TODO: corriger l'erreur quand il n'y a pas de résultats.

	/*if (contentList){
		msg.content = "Désolé, nous ne trouvons aucun résultats de recherche pour : " + searched;
		return msg;
	}*/
}

async function sendMessage(message, searched){
	// console.log(message, searched)
	message.channel.send(await pornhubSearch(searched));
}

async function sendGif(message, searched){
	console.log(message, searched)
	message.channel.send(await pornhubSearchGif(searched));
}


client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

const cooldowns = new Collection()



client.once('ready', () => {
	console.log('Ready!');
})

client.on('message', async message => {
	
	if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return;


  let args = message.content.slice(BOT_PREFIX.length).trim().split(/ +/g);

	if (message.content.startsWith('!ph ')){
		let search;
		if (message.content.length > 5){
		search = message.content.slice(4);
	} 
		if (search.length >= 1){

			sendMessage(message, search);
        
	    }else{
            message.reply('parametres de recherche manquants');
        }
	}else if (message.content.startsWith('!ph-gif ')){
		let search;
		if (message.content.length > 9){
		search = message.content.slice(8);
		}

		if (search.length >= 1){
			console.log(message, search)
			sendGif(message, search);
		}
	}



  const commandName = args.shift().toLowerCase();
 
  let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;



  if (!command.name == 'dump' && command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    
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
          return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
      }
      timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

try {
	console.log(args[0])
await command.execute( message,client,args);
} catch (error) {
	console.error(error.stack);
	message.reply('there was an error trying to execute that command!');
}
});

client.login(DISCORD_TOKEN).catch(err => console.error(err.stack));;