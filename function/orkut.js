const axios = require('axios');
const crypto = require("crypto");
const QRCode = require('qrcode');
const { ImageUploadService } = require('node-upload-images');

function convertCRC16(str) {
        let crc = 0xFFFF;
        for (let c = 0; c < str.length; c++) {
            crc ^= str.charCodeAt(c) << 8;
            for (let i = 0; i < 8; i++) {
                crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
            }
        }
        return ("000" + (crc & 0xFFFF).toString(16).toUpperCase()).slice(-4);
    }

function generateTransactionId() {
        return crypto.randomBytes(5).toString('hex').toUpperCase();
    }

    function generateExpirationTime() {
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 30);
        return expirationTime;
    }


async function elxyzFile(buffer) {
        try {
            const service = new ImageUploadService('pixhost.to');
            let { directLink } = await service.uploadFromBinary(buffer, 'shiro.png');
            return directLink;
        } catch (error) {
            console.error('🚫 Upload Failed:', error);
            throw error;
        }
    }
    
async function generateQRIS(amount) {
    try {
        let qrisData = "code qris lu";

        qrisData = qrisData.slice(0, -4);
        const step1 = qrisData.replace("010211", "010212");
        const step2 = step1.split("5802ID");

        amount = amount.toString();
        let uang = "54" + ("0" + amount.length).slice(-2) + amount;
        uang += "5802ID";

        const result = step2[0] + uang + step2[1] + convertCRC16(step2[0] + uang + step2[1]);

        const buffer = await QRCode.toBuffer(result);

        const uploadedFile = await elxyzFile(buffer);

        return {
            transactionId: generateTransactionId(),
            amount: amount,
            expirationTime: generateExpirationTime(),
            qrImageUrl: uploadedFile
        };
    } catch (error) {
        console.error('Error generating and uploading QR code:', error);
        throw error;
    }
}

async function createQRIS(amount, codeqr) {
        try {
            let qrisData = codeqr.slice(0, -4);
            const step1 = qrisData.replace("010211", "010212");
            const step2 = step1.split("5802ID");

            let uang = "54" + ("0" + amount.length).slice(-2) + amount + "5802ID";
            const result = step2[0] + uang + step2[1] + convertCRC16(step2[0] + uang + step2[1]);

            const buffer = await QRCode.toBuffer(result);
            const uploadedFile = await elxyzFile(buffer);

            return {
                transactionId: generateTransactionId(),
                amount: amount,
                expirationTime: generateExpirationTime(),
                qrImageUrl: uploadedFile
            };
        } catch (error) {
            console.error('Error generating and uploading QR code:', error);
            throw error;
        }
    }
    
async function checkQRISStatus() {
    try {
        const apiUrl = `https://gateway.okeconnect.com/api/mutasi/qris/isi pakai merchant orkut/apikey orkut`;
        const response = await axios.get(apiUrl);
        const result = response.data;
        const data = result.data;
        let capt = '*Q R I S - M U T A S I*\n\n';
        if (data.length === 0) {
            capt += 'Tidak ada data mutasi.';
        } else {
            data.forEach(entry => {
                capt += '```Tanggal:```' + ` ${entry.date}\n`;
                capt += '```Issuer:```' + ` ${entry.brand_name}\n`;
                capt += '```Nominal:```' + ` Rp ${entry.amount}\n\n`;
            });
        }
        return capt;
    } catch (error) {
        console.error('Error checking QRIS status:', error);
        throw error;
    }
}
    
module.exports = { convertCRC16, generateTransactionId, generateExpirationTime, elxyzFile, generateQRIS, createQRIS, checkQRISStatus };