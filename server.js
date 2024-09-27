const express = require('express');
const cors = require('cors');  // Importer CORS
const app = express();
const port = 3000;

// Charger les données depuis le fichier JSON
const productsData = require('./data.json');

// Utiliser le middleware CORS
app.use(cors());

// Ajouter des IDs dynamiques aux produits (en fonction de leur index)
const productsWithIds = productsData.products.map((product, index) => {
  return { ...product, id: index };
});

// Route pour récupérer tous les produits
app.get('/products', (req, res) => {
  res.json(productsWithIds);
});

// Route pour récupérer un produit spécifique via son ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = productsWithIds.find(p => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Produit non trouvé' });
  }
});

// Démarrer le serveur sur le port 3000
app.listen(port, () => {
  console.log(`API démarrée sur http://localhost:${port}`);
});
