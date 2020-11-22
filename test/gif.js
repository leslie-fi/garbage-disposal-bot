module.exports = {
name: "dick",
args: true,

execute({ message, client, args }) {
if (!message.channel.nsfw) {
    message.channel.send(":underage: NSFW Command. Please switch to NSFW channel in order to use this command.")
} else {
    var subreddits = [
        'dick',
        'Dick',
        'dickpic',
        'Dickpic'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    client.external.randomPuppy(sub).then(url => {
        let embed = new client.external.Discord.RichEmbed()
            .setDescription("<:benis:525358938045022231>")
            .setImage(url)
            .setColor('RANDOM')
        message.channel.send(embed)
    })
}
}