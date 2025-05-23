const WebSocket = require("ws");
const crypto = require("crypto");
const axios = require("axios");

const WS_URL = "wss://pixnova.ai/demo-photo2anime/queue/join";
const IMAGE_URL = "https://oss-global.pixnova.ai/";
const SESSION = crypto.randomBytes(5).toString("hex").slice(0, 9);
let wss;
let promise;

function _connect(log) {
  return new Promise((resolve, reject) => {
    wss = new WebSocket(WS_URL);
    wss.on("open", () => {
      console.log("[ INFO ] Koneksi ke websocket tersambung.");
      resolve();
    });

    wss.on("error", (error) => {
      console.error("[ ERROR ] " + error);
      reject(error);
    });

    wss.on("message", (chunk) => {
      const data = JSON.parse(chunk.toString());
      if (promise && promise.once) {
        promise.call(data);
        promise = null;
      } else if (promise && !promise.once) {
        if (log) console.log(data);
        if (data?.code === 200 && data?.success) {
          let amba = data;
          amba.output.result.forEach((_, i) => {
            amba.output.result[i] = IMAGE_URL + amba.output.result[i];
          });
          promise.call(amba);
          promise = null;
        }
      }
    });
  });
}

function _send(payload, pr) {
  return new Promise((resolve) => {
    wss.send(JSON.stringify(payload));
    if (pr) {
      promise = {
        once: true,
        call: resolve,
      };
    } else {
      promise = {
        once: false,
        call: resolve,
      };
    }
  });
}

async function PixNova(data, image, log) {
  let base64Image;
  if (/https\:\/\/|http\:\/\//i.test(image)) {
    const gs = await axios.get(image, { responseType: "arraybuffer" });
    base64Image = Buffer.from(gs.data).toString("base64");
  } else if (Buffer.isBuffer(image)) {
    base64Image = image.toString("base64");
  } else {
    base64Image = image;
  }
  await _connect(log);
  let payload = { session_hash: SESSION };
  const resp = await _send(payload, true);
  if (log) console.log(`[ ${SESSION} ] Hash: ${JSON.stringify(resp, null, 2)}`);

  payload = {
    data: {
      source_image: `data:image/jpeg;base64,${base64Image}`,
      strength: data?.strength || 0.6,
      prompt: data.prompt,
      negative_prompt: data.negative,
      request_from: 2,
    },
  };

  return await _send(payload, false);
}

module.exports = { PixNova }