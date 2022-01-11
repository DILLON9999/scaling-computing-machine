require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs')
const messageList = fs.readFileSync("./messages.txt", "utf-8").split('\n')

// List of channel IDs to talk in
chatLists = ["929087860202668072", "929811936919576653", "928891556440711168", "918511560090066986"]

class selfbot {

    constructor(token) {
        this.token = token
        this.client = new Discord.Client()
    }

    // Send random message
    message(id) {
        let message = Math.floor(Math.random() * messageList.length);
        try {
            this.client.channels.get(id).send(messageList[message])
        } catch (e) { console.log(e) }
    }

    // React to some messages sent
    react(message) {
        let randNum = Math.floor(Math.random() * (100 - 1 + 1) + 1)
        const emotes = ["💯","💀","🚀","🔥"]
    
        if (message.author.id !== this.client.user.id && chatLists.includes(message.channel.id) && randNum < 2) {
            let emote = Math.floor(Math.random() * emotes.length);
            message.react(emotes[emote])
        }    
    }

}

let bob = new selfbot(process.env.bob_token)

bob.client.on('ready', async function() {
    console.log(`Now monitoring as ${bob.client.user.tag}`);
    while (true) {
        let messageDelay = Math.random() * (20000 - 15000) + 15000
        await sleep(messageDelay)
        for (let i = 0; i < chatLists.length; i++) {
            bob.message(chatLists[i])
        }
    }
});

bob.client.on('message', (message) => {
    bob.react(message)
})

bob.client.login(bob.token)

async function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}