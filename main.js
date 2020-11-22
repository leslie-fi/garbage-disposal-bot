require('dotenv').config()
const {Client, MessageEmbed, Message} = require('discord.js');
const Pornhub = require('@justalk/pornhub-api');
// const { GoogleApis } = require('googleapis');
const DISCORD_API_TOKEN = 'Rs5k-yn0lJ3ymKxt3T_hxdr33pHonUmG'
const DISCORD_API_PREFIX = process.env.prefix
const client = new Client();


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
	const contentList = await Pornhub.search(searched, ["title"], {search: 'gifs', page: 3});
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

client.on('ready', () =>{
	console.log("I am ready !");
});

client.on('message', message =>{

	if (message.content.startsWith('!ph ') && (message.channel.type === "dm" || message.channel.name.startsWith('nsfw'))){
		let search = message.content.slice(4);
		if (!search.length) search = '4k'
		if (search.length >= 1){

			sendMessage(message, search);
        
	    }else{
            message.reply('parametres de recherche manquants');
        }
	}else if (message.content.startsWith('!ph-gif ') && (message.channel.type === 'dm' || message.channel.name.startsWith('nsfw'))){
		let search = message.content.slice(8);
		if (!search.length) search = '4k'
		if (search.length >= 1){
			sendGif(message, search);
		}
	}

}, false);

client.login("Nzc1MTQwNzg3NDE4NjkzNjQy.X6iAHQ.VugYwhY2plznQMHmSJ-n5BXhONQ");

/*function test_youtube(searched){
	gapi.client.init(
		{
			'apiKey': 'AIzaSyCQLXTrH7kSYqClHA-XrVcpfAwnpTIXSlk'
			
		}
	)
}*/

//test_youtube();