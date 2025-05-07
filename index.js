const express = require('express');
const app = express();

app.use(express.json());

// 🌐 Variáveis globais
let latitude = "";
let longitude = "";
let ultimaRequisicao = null;

app.post('/location', (req, res) => {
  // Atualiza a variável de última requisição com a data/hora atual
  ultimaRequisicao = new Date().toISOString();

  latitude = req.body.latitude;
  longitude = req.body.longitude;

  return res.status(200).json({ 
    message: 'Dados recebidos!',
    latitude,
    longitude,
    ultimaRequisicao
  });
});

app.get('/location', (req, res) => {
  let status = "offline";

  if (ultimaRequisicao) {
    const agora = new Date();
    const ultima = new Date(ultimaRequisicao);
    const diffMs = agora - ultima;
    const diffSegundos = diffMs / 1000;

    if (diffSegundos <= 60) {
      status = "online";
    }
  }

  return res.status(200).json({ 
    latitude,
    longitude,
    ultimaRequisicao,
    status
  });
});

// Iniciar o servidor HTTP
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor HTTP rodando na porta ${PORT}`);
});
