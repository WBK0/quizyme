import { writeFile } from 'fs/promises';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

const saveImage = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const randomFileName = `${uuidv4()}${extname(file.name)}`;
  const path = `./serverImages/${randomFileName}`;

  await writeFile(path, buffer);

  return randomFileName;
}

export default saveImage;