import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CloudinaryResponse } from './cloudinary-response';

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream((error, result) => {
  if (error) return reject(error);
  
  // Si result es undefined, lanzamos un error para que nunca llegue al resolve
  if (!result) return reject(new Error('Cloudinary no devolvió ningún resultado'));

  resolve(result); // Ahora TS está seguro de que result NO es undefined ✅
});

      streamifier.createReadStream(file.buffer).pipe(upload);
    });
  }
}