/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';


@Injectable()
export class CloudinaryService {
    async uploadFile(
        file: Express.Multer.File,
      ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            console.log('hi')
          v2.uploader.upload_stream(
            {
              resource_type: 'auto',
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          ).end(file.buffer)
        })
      }
      
}