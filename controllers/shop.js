import Cart from '../models/cart.js';
import Product from '../models/product.js';

export async function getProducts(req, res) {
  const products = await Product.findAll();

  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products',
  });
}

export async function getProduct(req, res) {
  const prodId = req.params.productId;

  const product = await Product.findAll({ where: { id: prodId } });

  res.render('shop/product-detail', {
    product: product[0],
    pageTitle: product[0].title,
    path: '/products',
  });
}

export async function getIndex(req, res) {
  const products = await Product.findAll();

  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
  });
}

export async function getCart(req, res) {
  const cart = await req.user.getCart();
  const products = await cart.getProducts();

  console.log(products);

  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products,
  });
}

export async function postCart(req, res) {
  const prodId = req.body.productId;

  const cart = await req.user.getCart();
  const cartProduct = await cart.getProducts({ where: { id: prodId } });
  const product = await Product.findByPk(prodId);
  console.log(product[0]);

  if (!cartProduct.length) {
    await cart.addProduct(product, { through: { quantity: 1 } });
  } 

  res.redirect('/cart');
}

export async function postCartDeleteProduct(req, res) {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);

  Cart.deleteProduct(prodId, product.price);
  res.redirect('/cart');
}

export function getOrders(req, res) {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
}

export function getCheckout(req, res) {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
}
