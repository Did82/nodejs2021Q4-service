import { Injectable, StreamableFile, UploadedFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  async upload(@UploadedFile() file: Express.Multer.File) {
    return {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    };
  }

  download(filename: string) {
    const file = createReadStream(join('/app/uploaded-files', filename));
    return new StreamableFile(file);
  }
}
