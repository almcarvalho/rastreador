const express = require('express');
const cors = require('cors'); // <--- importe aqui
const app = express();

app.use(cors()); // <--- habilita o CORS globalmente
app.use(express.json());

// 🌐 Variáveis globais
let latitude = "";
let longitude = "";
let ultimaRequisicao = null;

app.post('/location', (req, res) => {
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

app.get('/location-random', (req, res) => {
  const coordenadas = [
    { latitude: -8.052240, longitude: -34.928612 },
    { latitude: -23.550520, longitude: -46.633308 },
    { latitude: -22.906847, longitude: -43.172897 },
    { latitude: -3.731862, longitude: -38.526669 },
    { latitude: -12.971391, longitude: -38.501305 }
  ];

  const coordenada = coordenadas[Math.floor(Math.random() * coordenadas.length)];

  return res.status(200).json({
    latitude: coordenada.latitude,
    longitude: coordenada.longitude,
    ultimaRequisicao: null,
    status: "offline"
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor HTTP rodando na porta ${PORT}`);
});
