const fetch = require('node-fetch');
import express, { Request, Response } from 'express';
require('dotenv').config();

const base = 'http://api.weatherapi.com/v1/current.json';

const router = express.Router();

router.get('/:query', async (req, res) => {
  const { query } = req.params;
  const data = await fetch(`${base}?key=${process.env.WEATHER_API_KEY}&q=${query}&aqi=yes`);
  const dataJSON = await data.json();
  res.json(dataJSON);
});

module.exports = router;