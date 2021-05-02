import { readFile, writeFile } from 'fs';
import { promisify } from 'util';

const productsFilePath = 'data/products.json';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

export async function readProductsFromFile() {
  try {
    const fileContent = await readFileAsync(productsFilePath);
    return JSON.parse(fileContent);
  } catch (err) {
    console.log(err);
  }
}

export async function writeProductsToFile(updatedProducts) {
  const fileContent = JSON.stringify(updatedProducts);
  
  try {
    await writeFileAsync(productsFilePath, fileContent);
  } catch (err) {
    console.log(err);
  }
}
