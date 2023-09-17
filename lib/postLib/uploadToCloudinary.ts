import {NextApiResponse} from "next";

require('dotenv').config();
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function uploadToCloudinary (imageArr: {id: string, url: string}[], res: NextApiResponse) {
    const tempArr = imageArr;
    for (const image of imageArr) {
        const {id, url} = image;
        try {
            const uploadResult = await cloudinary.uploader.upload(url);
            tempArr.filter(imgObj => imgObj.id === id)[0].url = uploadResult.secure_url;
        } catch (error) {
            return res.status(500).json({message: `Error uploading image: ${error}`});
        }
    }
    return tempArr;
}