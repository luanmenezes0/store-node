import Product from '../models/product.js';

export function getAddProduct(req, res) {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
}

export async function postAddProduct(req, res) {
  const {
    body: { title, imageUrl, price, description },
    user,
  } = req;

  try {
    await user.createProduct({ title, price, description, imageUrl });

    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
}

export async function getEditProduct(req, res) {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  const product = await Product.findByPk(prodId);

  if (!product) {
    return res.redirect('/');
  }

  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product: product,
  });
}

export async function postEditProduct(req, res) {
  const {
    body: { productId, title, imageUrl, price, description },
  } = req;

  const product = await Product.findByPk(productId);

  product.title = title;
  product.imageUrl = imageUrl;
  product.price = price;
  product.description = description;

  await product.save();

  res.redirect('/admin/products');
}

export async function getProducts(req, res) {
  const products = await req.user.getProducts();

  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products',
  });
}

export async function postDeleteProduct(req, res) {
  const prodId = req.body.productId;

  const product = await Product.findByPk(prodId);

  await product.destroy();
  res.redirect('/admin/products');
}
