const {sendEmbed} =  require('../utils/pornhubApi')
module.exports = {
  name: "pornhub video",
  aliases: ["ph"],
  description: "get URL of a pornhub video by query",
  args: true,
  cooldown: 4,

  execute: async (message, client, args) => {
    let search;
	if (message.content.length > 5){
	  search = message.content.slice(4);
	} else {
        search = 'fetish'
    }
	if (search.length >= 1){
		sendEmbed(message, search);
	}else{
      message.reply('parametres de recherche manquants');
        }
  },
};
