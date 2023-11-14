import fs from 'fs/promises';

const getTmpDir = () => {
  return `${process.cwd()}/serverImages`;
};

const getFileContent = (filename : string) => {
    try {
      return fs.readFile(`${getTmpDir()}/${filename}`);
    } catch (error) {
      throw new Error('File not found');
    }
};

export const GET = async (req : Request, { params: { filename } } : {params: {filename: string}}) => {
  try {
    const file = await getFileContent(filename);

    if(!file){
      throw new Error('File not found');
    }

    return new Response(file,
      { status: 200 }
    );
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "File not found",
      }),
      { status: 500 }
    ) 
  }
};
