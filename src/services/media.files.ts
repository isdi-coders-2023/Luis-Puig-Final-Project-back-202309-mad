/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import createDebug from 'debug';
import { ImgData } from '../types/img.data.js';
import { HttpError } from '../types/http.error.js';

const debug = createDebug('EPV:mediaFiles');

export class MediaFiles {
  constructor() {
    cloudinary.config({
      cloud_name: 'djz7c5bdp',
      api_key: '543943928893469',
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true, // Setting return "https" URLs
    });
    debug('Instantiated');
    debug('key', cloudinary.config().api_key);
  }

  async uploadImage(imagePath: string) {
    try {
      const uploadApiResponse = await cloudinary.uploader.upload(imagePath, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      const imgData: ImgData = {
        url: uploadApiResponse.url,
        publicId: uploadApiResponse.public_id,
        size: uploadApiResponse.bytes,
        height: uploadApiResponse.height,
        width: uploadApiResponse.width,
        format: uploadApiResponse.format,
      };

      return imgData;
    } catch (err) {
      const error = err as Error;
      throw new HttpError(406, 'Not Acceptable', error.message);
    }
  }
}
