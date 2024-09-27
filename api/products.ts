// api/products.js
const express = require('express');
const serverless = require('serverless-http'); // Importer serverless-http
const app = express();

// Charger les données depuis le fichier JSON
const productsData = require('../data.json');

// Ajouter des IDs dynamiques aux produits
const productsWithIds = productsData.products.map((product, index) => {
  return { ...product, id: index };
});

// Route pour récupérer tous les produits
app.get('/api/products', (req, res) => {
  res.json(productsWithIds);
});

// Route pour récupérer un produit spécifique
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = productsWithIds.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Produit non trouvé' });
  }
});

// Exporter la fonction pour Vercel
module.exports = serverless(app); // Utiliser serverless-http
