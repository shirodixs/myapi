const axios = require('axios');

async function muslimai(query) {
    const searchUrl = 'https://www.muslimai.io/api/search';
    const searchData = {
        query: query
    };
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const searchResponse = await axios.post(searchUrl, searchData, { headers: headers });

        if (!searchResponse.data || !Array.isArray(searchResponse.data)) {
            throw new Error("Invalid search response data");
        }

        const passages = searchResponse.data.map(item => item.content).join('\n\n');

        const answerUrl = 'https://www.muslimai.io/api/answer';
        const answerData = {
            prompt: `Gunakan bahasa Indonesia dari bagian-bagian berikut untuk menjawab pertanyaan sebaik mungkin dengan kemampuan Anda sebagai ahli Al-Qur'an kelas dunia. Jangan sebutkan bahwa Anda diberikan bagian-bagian tertentu dalam jawaban Anda : ${query}\n\n${passages}`
        };

        const answerResponse = await axios.post(answerUrl, answerData, { headers: headers });

        if (!answerResponse.data) {
            throw new Error("Invalid answer response data");
        }

        const result = {
            answer: answerResponse.data,
            source: searchResponse.data
        };

        return result;

    } catch (error) {
        console.error('Error in muslimai:', error.message || error);
        throw new Error("Failed to process query.  Please try again later.");
    }
}

module.exports = { muslimai }