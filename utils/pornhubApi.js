const Pornhub = require('@justalk/pornhub-api');
const {MessageEmbed, Message} = require('discord.js');

async function pornhubSearch(searched = 'fetish'){
	let contentList;
	try {
		contentList = await Pornhub.search(searched, " ",{page: 3});
		if (!contentList.results) contentList = await Pornhub.search("fetish", " ",{page: 3});
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

async function pornhubSearchGif(searched){
	let contentList;
	try {
		contentList = await Pornhub.search(searched, ["title"], {search: 'gifs', page: 3});
		if (!contentList.results) contentList = await Pornhub.search("fetish", ["title"], {search: 'gifs', page: 3});
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

exports.sendEmbed = async (message, searched) => {
	// console.log(message, searched)
	message.channel.send(await pornhubSearch(searched));
}

exports.sendGif = async (message, searched) => {
	console.log(message, searched)
	message.channel.send(await pornhubSearchGif(searched));
}
