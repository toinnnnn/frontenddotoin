const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Permitir o acesso de qualquer origem (cross-origin)
app.use(cors());

// Dados estáticos (exemplo)
const gameData = {
  title: "Elden Ring DLC",
  description: "Elden Ring, desenvolvido pela FromSoftware e BANDAI NAMCO, é uma aventura de RPG de ação e fantasia.",
  trailer: "https://youtu.be/Djtsw5k_DNc",
  image: "elden.jpeg"
};

// Rota GET para retornar os dados
app.get('/api/game', (req, res) => {
  res.json(gameData);
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
