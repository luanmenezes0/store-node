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
  } = req;

  const product = new Product(null, title, imageUrl, description, price);

  try {
    await product.save();
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

  const product = await Product.findById(prodId);

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
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice,
  );
  await updatedProduct.save();
  res.redirect('/admin/products');
}

export async function getProducts(req, res) {
  const products = await Product.fetchAll();

  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products',
  });
}

export function postDeleteProduct(req, res) {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
}
