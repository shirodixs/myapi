const axios = require('axios')
const FormData = require('form-data');

const models = ["flux_1_schnell", "flux_1_dev", "sana_1_6b"];
const sizes = ["1_1", "1_1_HD", "1_2", "2_1", "2_3", "4_5", "9_16", "3_2", "4_3", "16_9"];
const styles = ["no_style", "anime", "digital", "fantasy", "neon_punk", "dark", "low_poly", "line_art", "pixel_art", "comic", "analog_film", "surreal"];
const colors = ["no_color", "cool", "muted", "vibrant", "pastel", "bw"];
const lightings = ["no_lighting", "lighting", "dramatic", "volumetric", "studio", "sunlight", "low_light", "golden_hour"];


async function fluxgenerator(prompt, model = "flux_1_dev", size = "1_1_HD", style = "no_style", color = "no_color", lighting = "no_lighting") {
    try {
        const formData = new FormData()
        formData.append("prompt", prompt)
        formData.append("model", model)
        formData.append("size", size)
        formData.append("style", style)
        formData.append("color", color)
        formData.append("lighting", lighting)
        const headers = {
            ...formData.getHeaders(),
        }
        const response = await axios.post("https://api.freeflux.ai/v1/images/generate", formData, {
            headers
        });
        const { id, status, result, processingTime, width, height, nsfw, seed } = response.data;
        const imageBuffer = Buffer.from(result.split(",")[1], "base64");
        return {
            status: true,
            id,
            height,
            width,
            nsfw,
            processing: processingTime,
            buffer: Buffer.from(imageBuffer)
        }
    } catch (error) {
        console.error(error);
        throw error
    }
}

module.exports = { fluxgenerator, models, sizes, styles, colors, lightings }