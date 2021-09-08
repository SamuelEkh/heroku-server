import mongoose from 'mongoose';
require('dotenv').config()

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  specs: { type: Array, required: true },
  price: { type: String, required: true },
  priceRange: { type: String, required: true },
  productGroup: { type: String, required: true },
  use: { type: Array, required: true },
  recRating: { type: Number, required: true },
  sales: { type: Number },
  rating: { type: Number },
  reviews: { type: Array },
  img: { type: String, required: true },
},
  { collection: 'products' }
)

/* const visiDB = mongoose.connection.useDb('VisiShop'); */

/* const ProductSchema = visiDB.model('Product', productSchema); */

const ProductSchema = mongoose.model('Product', productSchema);

module.exports = ProductSchema;