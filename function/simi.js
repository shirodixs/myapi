const axios = require('axios');

  const chatSimi = (teks) => new Promise((resolve, reject) => {
    if (typeof teks !== 'string') {
      console.error('Text must be a string');
      return reject('Invalid text');
    }

    const data = new URLSearchParams();
    data.append('text', teks);
    data.append('lc', 'id'); 

    axios.post('https://api.simsimi.vn/v2/simtalk', data)
      .then(response => {
        if (response.data && response.data.message) {
          resolve(response.data.message);
        } else {
          reject('Invalid response from SimSimi API.');
        }
      })
      .catch(err => {
        console.error("Error from SimSimi API:", err);
        reject('Failed to communicate with SimSimi API.');
      });
  });


module.exports = { chatSimi }