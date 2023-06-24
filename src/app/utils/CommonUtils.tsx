import imageCompression from 'browser-image-compression';
import { Buffer } from 'buffer';
class CommonUtils {
    compress(file: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    maxSizeMB: 10,
                };
                const compressedFile = await imageCompression(file, options);
                if (compressedFile) resolve(compressedFile);
            } catch (error) {
                reject(error);
            }
        });
    }
    getBase64(file: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (err: any) => reject(err);
            } catch (error) {
                reject(error);
            }
        });
    }
    convertBase64(file: any) {
        try {
            if (file?.type === 'Buffer') {
                const imageBase64 = Buffer.from(file, 'base64').toString('binary');
                if (imageBase64) return imageBase64;
            }
            return file;
        } catch (error) {
            console.log(error);
        }
    }
    convertBase64Gridfs(file: any) {
        try {
            if (file?.type === 'Buffer') {
                const imageBase64 = Buffer.from(file).toString('base64');
                if (imageBase64) return imageBase64;
            }
            return file;
        } catch (error) {
            console.log(error);
        }
    }
}
export default new CommonUtils();
