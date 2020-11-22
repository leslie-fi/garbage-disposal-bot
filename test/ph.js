
const { MessageEmbed, Message, Collection} = require('discord.js');
const fs = require('fs');
const Pornhub = require('@justalk/pornhub-api');


const {DISCORD_TOKEN, BOT_PREFIX} = process.env;


module.exports = {
  name: 'ph',
  description: 'pornhub video url',
  cooldown: 4,
  execute(message, args) {
    message.channel.send(await pornhubSearch(searched));
  }
}

async function pornhubSearch(searched){
	const contentList = await Pornhub.search(searched, " ",{page: 4});

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

async function pornhubSearchGif(searched){
	const contentList = await Pornhub.search(searched, ["title"], {search: 'gifs', page: 4});
	const msg = new Message();

	//TODO: corriger l'erreur quand il n'y a pas de résultats.

	/*if (contentList){
		msg.content = "Désolé, nous ne trouvons aucun résultats de recherche pour : " + searched;
		return msg;
	}*/

	var alea = Math.floor((Math.random() * contentList.results.length-1));

	const content =  contentList.results[alea].link_mp4;
	if (!content){
		content  = contentList.result[alea].link_webm;
	}

	
	msg.content = content

	return msg;
}

async function sendMessage(message, searched){
	message.channel.send(await pornhubSearch(searched));
}

async function sendGif(message, searched){
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
});

client.on('message', message => {
	
	if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return;


  let args = message.content.slice(BOT_PREFIX.length).trim().split(/ +/);

	if (message.content.startsWith('!ph ')){
		let search;
		if (message.content.length > 5){
		search = message.content.slice(4);} else {
			search = '4k'
		}
		if (search.length >= 1){

			sendMessage(message, search);
        
	    }else{
            message.reply('parametres de recherche manquants');
        }
	}else if (message.content.startsWith('!ph-gif ')){
		let search;
		if (message.content.length > 9){
		search = message.content.slice(8);} else {
			search = '4k'
		}

		if (search.length >= 1){
			sendGif(message, search);
		}
	}



  const commandName = args.shift().toLowerCase();
 
  let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;



  if (command.args && !args.length) {
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
command.execute( message, client, args);
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}
  // if (command === 'ping') {
  //   message.channel.send('Pong.');
  // } else if (command === 'server') {
  //   message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nInception: ${message.guild.createdAt}`);
  // } else if (command === 'user-info') {
  //   message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  // }
});

client.login(DISCORD_TOKEN);