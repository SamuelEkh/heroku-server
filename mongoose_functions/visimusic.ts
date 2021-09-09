require('dotenv').config()
const mongoose = require('mongoose');
const Product = require('../models/visimusic/products');
const User = require('../models/visimusic/user');
const Cart = require('../models/visimusic/cart');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const findUser = async (filter: any) => {
  const response = await User.find(filter).exec();
  return response;
}

const findProducts = async (filter: any) => {
  const response = await Product.find(filter).exec();
  return response;
}

const findAllProducts = async () => {
  const response = await Product.find({}).exec();
  return response;
}

const addProduct = async (name: string, description: string, specs: string, price: number, priceRange:string, productGroup: string, use: string, recRating: number, img: string) => {
  const product = new Product({
    name,
    description,
    specs,
    price,
    priceRange,
    productGroup,
    use,
    recRating,
    sales: 0,
    rating: 0,
    reviews: [],
    img
  });
  
  product.save(function (err: Error) {
    if (err) return console.log(err);
  });
}

const addCart = async (username: string) => {
  const cart = new Cart({
    cartUser: username,
    items: []
  });
  
  cart.save(function (err: Error) {
    if (err) return console.log(err);
  })

};

const addToCart = async (cartUser: string, item: string) => {
  const response = await Cart.findOneAndUpdate({cartUser}, {$push: {items: item}}, {new: true});
  return response;
}

const removeFromCart = async (cartUser: string, item: any) => {
  const response = await Cart.findOneAndUpdate({cartUser}, { $pull: { 'items':  {'idInCart' : item.idInCart}} }, {new: true});
  return response;
}

const getCart = async (cartUser: string) => {
  const response = await Cart.find({cartUser});
  return response[0].items;
}

const registerUser = async (name: string, email: string, username: string, password: string, cb: any) => {
  if(!name || typeof(name) !== 'string') {
    console.log('Invalid name')
    // return res.json({status: 'error', error: 'Invalid name'})
  }
  if(!email || typeof(email) !== 'string') {
    console.log('Invalid email')
    // return res.json({status: 'error', error: 'Invalid email'})
  }
  if(!username || typeof(username) !== 'string') {
    console.log('Invalid username')
    // return res.json({status: 'error', error: 'Invalid username'})
  }
  if(!password || typeof(password) !== 'string') {
    console.log('Invalid password')
    // return res.json({status: 'error', error: 'Invalid password'})
  }
  if(password.length < 5) {
    console.log('Password too short')
    // return res.json({status: 'error', error: 'Password too short'})
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const response = await User.create({
      name,
      email,
      username,
      encryptedPassword
    })
    console.log('User created:', response)

    const user = await User.findOne({ username }).lean();

    const token = jwt.sign({ 
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email
    }, process.env.JWT_SECRET)

    return cb(token)

  } catch(error: any) {
    if(error.code === 11000) {
      return console.log({status: 'error', error: 'Username already in use'})
    }
    throw error;
  }

}

const loginUser = async (username: string, password: string, cb: any) => {
  const user = await User.findOne({ username }).lean();

  // if(!user) {
  //   return res.json({status: 'error', error: 'Invalid username/password'})
  // }

  if(await bcrypt.compare(password, user.encryptedPassword)) {
    const token = jwt.sign({ 
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email
    }, process.env.JWT_SECRET)

    return cb(token);
  }

  return console.log('error in loginUser')

}

module.exports = {
  addProduct, findProducts, findAllProducts, registerUser, loginUser, addCart, addToCart, removeFromCart, getCart, findUser
}
