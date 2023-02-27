// const { verifyToken } = require('./jwtToken');
// const loginService = require('../services/loginService');

// module.exports = async (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ error: 'Token não encontrado' });
//   }

//   try {
//     const decoded = verifyToken(token);

//     const user = await loginService.usersServiceId(decoded.data.userId);

//     if (!user) {
//       return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
//     }
//     req.user = user;

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: err.message });
//   }
// };