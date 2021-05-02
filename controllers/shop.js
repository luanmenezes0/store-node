import Cart from '../models/cart.js';
import Product from '../models/product.js';

export async function getProducts(req, res) {
  const products = await Product.fetchAll();

  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products',
  });
}

export async function getProduct(req, res) {
  const prodId = req.params.productId;

  const product = await Product.findById(prodId);

  res.render('shop/product-detail', {
    product: product,
    pageTitle: product.title,
    path: '/products',
  });
}

export async function getIndex(req, res) {
  const products = await Product.fetchAll();

  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
  });
}

export async function getCart(req, res) {
  Cart.getCartProducts(async (cart) => {
    const products = await Product.fetchAll();

    const cartProducts = [];
    for (const product of products) {
      const cartProductData = cart.products.find((prod) => prod.id === product.id);
      if (cartProductData) {
        cartProducts.push({ productData: product, qty: cartProductData.qty });
      }
    }
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: cartProducts,
    });
  });
}

export async function postCart(req, res) {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  Cart.addProduct(prodId, product.price);

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
