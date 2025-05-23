const fetch = require("node-fetch");

async function igdown(url) {
    try {
        const response = await fetch(`https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        if (!data.data || data.data.length === 0) {
            throw new Error("No data available");
        }

        return data.data.map(item => ({
            thumb: item.thumbnail,
            download: item.url
        }));
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

module.exports = { igdown }