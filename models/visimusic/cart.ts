import mongoose from 'mongoose';
require('dotenv').config()

const cartSchema = new mongoose.Schema({
  cartUser: { type: String, required: true, unique: true },
  items: { type: Array, required: true }
},
  { collection: 'carts' }
)

/* const visiDB = mongoose.connection.useDb('VisiShop');

const CartSchema = visiDB.model('cart', cartSchema); */

const CartSchema = mongoose.model('cart', cartSchema);

module.exports = CartSchema;