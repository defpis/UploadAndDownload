import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as dayjs from 'dayjs';

@Injectable()
export class AppService {
  download(filename: string) {
    const filePath = path.join(process.cwd(), `static/${filename}`);

    if (!fs.existsSync(filePath)) {
      throw new BadRequestException('文件不存在');
    }

    return fs.createReadStream(filePath);
  }

  upload(file: Express.Multer.File) {
    const { name, ext } = path.parse(file.originalname);

    const filePath = path.join(
      process.cwd(),
      `static/upload/${name}_${dayjs().format('YYYYMMDDHHmmss')}${ext}`,
    );

    if (fs.existsSync(filePath)) {
      throw new BadRequestException('文件已存在');
    }

    const stream = fs.createWriteStream(filePath);
    stream.write(file.buffer);
    stream.end();
  }
}
