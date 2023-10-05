const db = require("../models");
const Order = db.order;
const Product = db.product;

exports.addToWishlist = async (req, res) => {
  const { user_id, product_id } = req.body;

  try {
    const existingOrder = await Order.findOne({
      where: {
        user_id: user_id,
        product_id: product_id,
        status: 'wishlist'
      }
    });

    if (existingOrder) {
      return res.status(400).json({ message: 'Produk sudah ada di wishlist.' });
    }

    const orderCode = await generateOrderCode();
    const orderId = await generateOrderId();
    const orderNumber = `${orderCode}${orderId}${generateDate()}`;

    // Tambahkan produk ke wishlist pengguna
    const newWishlistItem = await Order.create({
      no_order: orderNumber,
      user_id: user_id,
      product_id: product_id,
      status: 'wishlist'
    });
    
    res.status(201).json({
      success: true,
      message: 'Produk berhasil ditambahkan ke wishlist.',
      wishlistItem: newWishlistItem
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const wishlistItemId = req.params.id;

  try {
    const wishlistItem = await Order.findByPk(wishlistItemId);

    if (wishlistItem && wishlistItem.status === 'wishlist') {
      await wishlistItem.destroy();
      res.status(200).json({
        success: true,
        message: 'Product berhasil dihapus dari wishlist.'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product tidak ditemukan dalam wishlist atau sudah tidak dalam status wishlist.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus product dari wishlist: ' + error.message
    });
  }
};

async function generateOrderCode() {
    const product = await Product.findOne();
    const category = product.category;
    const orderCode = category.slice(0, 2).toUpperCase();
    return orderCode;
}

async function generateOrderId() {  
    const product = await Product.findOne({
      attributes: ['id'],
      product: [['id', 'DESC']],
      limit: 1
    });

    if (product) {
      const orderId = product.id;
      return orderId;
    } else {
      return null;
    }
}

function generateDate() {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${day}${month}${year}`;
}