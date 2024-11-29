const axios = require('axios');

const sendSms = async (message, numbers) => {
    try {
        const apiKey = process.env.FAST2SMS_API_KEY;

        if (!apiKey) {
            throw new Error("Fast2SMS API key is missing in the environment variables.");
        }

        const options = {
            method: 'POST',
            url: 'https://www.fast2sms.com/dev/bulkV2',
            headers: {
                authorization: apiKey,
                'Content-Type': 'application/json',
            },
            data: {
                route: 'v3', 
                sender_id: 'TXTIND',
                message: message,
                language: 'english',
                numbers: numbers.join(','),
            },
        };

        const response = await axios(options);
        console.log('Fast2SMS Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending SMS:', error.message);
        throw error;
    }
};

module.exports = sendSms;
