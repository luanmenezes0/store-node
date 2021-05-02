import { readProductsFromFile, writeProductsToFile } from '../db/db.js';
import Cart from './cart.js';

export default class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    const products = await readProductsFromFile();

    if (this.id) {
      const existingProductIndex = products.findIndex((prod) => prod.id === this.id);
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex] = this;

      await writeProductsToFile(updatedProducts);
    } else {
      this.id = Math.random().toString();
      products.push(this);

      await writeProductsToFile(products);
    }
  }

  static async deleteById(id) {
    const products = await readProductsFromFile();
    const product = products.find((prod) => prod.id === id);
    const updatedProducts = products.filter((prod) => prod.id !== id);

    try {
      await writeProductsToFile(updatedProducts);
      Cart.deleteProduct(id, product.price);
    } catch (err) {
      console.log(err);
    }
  }

  static async fetchAll() {
    const products = await readProductsFromFile();
    return products;
  }

  static async findById(id) {
    const products = await readProductsFromFile();
    const product = products.find((p) => p.id === id);
    return product;
  }
}
