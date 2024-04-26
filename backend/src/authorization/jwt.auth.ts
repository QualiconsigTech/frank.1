const jwt = require('jsonwebtoken');

// Chave secreta para assinar e verificar tokens
export const secretKey = process.env.JWT_SECRET_KEY;

