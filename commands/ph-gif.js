const {sendGif} =  require('../utils/pornhubApi')
module.exports = {
  name: "pornhub gif",
  aliases: ["ph-gif"],
  description: "get URL of a pornhub video by query",
  args: true,
  cooldown: 4,

  execute: async (message, client, args) => {
    let search;
if (message.content.length > 9){
		search = message.content.slice(8);
	} else {
        search = 'fetish'
    }
	if (search.length >= 1){
		sendGif(message, search);
	}else{
        message.reply('parametres de recherche manquants');
    }
  },
};
