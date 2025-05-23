const axios = require('axios');
const FormData = require('form-data');

const deepSeekCoder = {
  chat: async (message) => {
    try {
      const formData = new FormData();
      formData.append("content", `User: ${message}`);
      formData.append("model", "@groq/deepseek-r1-distill-llama-70b");

      const headers = {
        ...formData.getHeaders()
      };


      const response = await axios.post("https://mind.hydrooo.web.id/v1/chat", formData, { headers });

      return response.data.result;
    } catch (error) {
      console.error("Error in deepSeekCoder.chat:", error);
       if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
            throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || error.message}`);
        } else if (error.request) {
            console.error("Request error:", error.request);
            throw new Error("Network Error: Could not connect to the API.");
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
  }
};

module.exports = { deepSeekCoder }