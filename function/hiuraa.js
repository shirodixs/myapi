const fetch = require("node-fetch");

async function aoyo(text) {
    try {
        const response = await fetch(`https://api.hiuraa.my.id/ai/aoyo?text=${encodeURIComponent(text)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data.result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function gpt4(text) {
    try {
        const response = await fetch(`https://api.hiuraa.my.id/ai/gpt-4o?text=${encodeURIComponent(text)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data.result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


async function gpt3(text) {
    try {
        const response = await fetch(`https://api.hiuraa.my.id/ai/gpt-turbo?text=${encodeURIComponent(text)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data.result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


module.exports = { aoyo, gpt4, gpt3 }