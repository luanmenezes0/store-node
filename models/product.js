import { client } from '../util/database.js';

export default class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static async fetchAll() {
    const result = await client.query('SELECT * FROM products');
    return result.rows;
  }

  static async findById(id) {
    const queryString = 'SELECT * FROM products WHERE products.id = ($1)';
    const { rows } = await client.query(queryString, [id]);

    return rows[0];
  }

  static async deleteById(id) {
    const queryString = 'DELETE FROM products WHERE products.id = ($1)';
    await client.query(queryString, [id]);
  }

  async save() {
    const queryText =
      'INSERT INTO products (title, price, description, "imageUrl") \
       VALUES ($1, $2, $3, $4) ';
    return await client.query(queryText, [this.title, this.price, this.description, this.imageUrl]);
  }
}
