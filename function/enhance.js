const FormData = require('form-data');
const axios = require('axios');

async function enhance(urlPath, method) {
  return new Promise((resolve, reject) => {
    const Methods = ['enhance', 'recolor', 'dehaze'];
    // Jika method tidak sesuai, gunakan method default (enhance)
    method = Methods.includes(method) ? method : Methods[0];
    const form = new FormData();
    const scheme = "https://" + "inferenceengine" + ".vyro" + ".ai/" + method;

    form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=utf-8",
    });
    form.append("image", Buffer.from(urlPath), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });

    form.submit({
      url: scheme,
      host: "inferenceengine.vyro.ai",
      path: "/" + method,
      protocol: "https:",
      headers: {
        "User-Agent": "okhttp/4.9.3",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip",
      },
    }, (err, res) => {
      if (err) return reject(err);
      const data = [];
      res.on("data", (chunk) => data.push(chunk));
      res.on("end", () => resolve(Buffer.concat(data)));
      res.on("error", (e) => reject(e));
    });
  });
}

module.exports = { enhance }