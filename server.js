const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const port = 3000;

const API_KEY = 'ondetewowaberese';

// Middleware para permitir o parsing de JSON nas requisições
app.use(express.json());
app.use(cors());

// Função para criptografar
function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', API_KEY);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Função para descriptografar
function decrypt(text) {
  const decipher = crypto.createDecipher('aes-256-cbc', API_KEY);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Middleware para verificar a chave de API
const authenticateAPIKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Chave de API inválida' });
  }
  next();
};

// Rota para criptografar
app.post('/encrypt', authenticateAPIKey, (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'Mensagem não fornecida' });
  }
  const encryptedMessage = encrypt(message);
  res.json({ encryptedMessage });
});

// Rota para descriptografar
app.post('/decrypt', authenticateAPIKey, (req, res) => {
  const { encryptedMessage } = req.body;
  if (!encryptedMessage) {
    return res.status(400).json({ message: 'Mensagem criptografada não fornecida' });
  }
  const decryptedMessage = decrypt(encryptedMessage);
  res.json({ decryptedMessage });
});

// Servir os arquivos HTML, CSS e JS estáticos
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});