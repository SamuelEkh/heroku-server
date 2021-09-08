import express, { Request, Response } from 'express';
const router = express.Router();
const mongo = require('../mongoose_functions/visimusic');

router.use(express.json());

/* router.post('/products/all', async (req: Request, res: Response) => {
  await mongo.postAllProducts(req.body)
    .then((data: any) => res.json(data));
}) */

router.get('/users/:username', async (req: Request, res: Response) => {
  const { username } = req.params;
  const filter = { username };
  await mongo.findUser(filter)
    .then((data: any) => res.json(data));
})

router.get('/products/productGroup/:productGroup', async (req: Request, res: Response) => {
  const { productGroup } = req.params;
  const filter = { productGroup };
  await mongo.findProducts(filter)
    .then((data: any) => res.json(data))
});

router.get('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const filter = {_id: id};
  await mongo.findProducts(filter)
    .then((data: any) => res.json(data))
});

router.get('/products', async (req: Request, res: Response) => {
  await mongo.findAllProducts()
    .then((data: any) => res.json(data));
})

router.post('/products', async (req: Request, res: Response) => {
  const { name, description, specs, price, priceRange, productGroup, use, recRating, img } = req.body;
  const product = await mongo.addProduct(name, description, specs, price, priceRange, productGroup, use, recRating, img);

  res
    .json(product)
    .status(201)
    .end();
});

router.post('/users/register', async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;
  const user = await mongo.registerUser(name, email, username, password, (data: any) => res.cookie('token', data));
  console.log(name, username);
  await mongo.addCart(username);

  res
    .json()
    .status(201)
    .end();
})

router.post('/users/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await mongo.loginUser(username, password, (data: any) => res.cookie('token', data));

  res
    .json()
    .status(201)
    .end();
})

router.put('/carts', async (req: Request, res: Response) => {
  const { username, item, method, id } = req.body;
  let cart = {}

  method === 'add' ? 
  cart = await mongo.addToCart(username, item)
  : cart = await mongo.removeFromCart(username, item);
  
  res
    .json(cart)
    .status(201)
    .end();
})

router.get('/carts/:username', async (req: Request, res: Response) => {
  const { username } = req.params;
  const cart = await mongo.getCart(username);

  res.json(cart)
})

module.exports = router;