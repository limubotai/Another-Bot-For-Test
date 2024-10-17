const axios = require('axios');

module.exports = {
    name: 'nash',
    description: 'Interact with Nashbot',
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const input = args.join(' ');
        const uid = event.senderID;

        if (!input) {
            return api.sendMessage('Please enter a message for Nashbot.', event.threadID, event.messageID);
        }

        const initialMessage = await api.sendMessage(
            "[ Nashbot ]\n\n" +
            "please wait...",
            event.threadID,
            event.messageID
        );

        try {
            const response = await axios.get(`${global.NashBot.JOSHUA}nashbot?q=${encodeURIComponent(input)}`);
            const result = response.data.response;

            if (!result) {
                throw new Error('No valid response received from the API.');
            }

            api.editMessage(
                "[ Nashbot ]\n\n" +
                `${result}\n\nHow to unsend a message?, react to it with a thumbs up (👍). If you are the sender, the bot will automatically unsend the message.`,
                event.threadID,
                initialMessage.messageID
            );
        } catch (error) {
            api.editMessage(
                "[ Nashbot ]\n\n" +
                "❌ An error occurred: " + error.message,
                event.threadID,
                initialMessage.messageID
            );
        }
    },
};