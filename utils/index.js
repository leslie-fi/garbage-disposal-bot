const Pornhub = require('@justalk/pornhub-api');


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
module.exports = {sendGif}