var express = require('express');
var router = express.Router();
const Link = require('../models/link');

// Rota para visualizar as estatísticas do link encurtado
router.get('/:code/stats', async (req, res, next) => {
  const code = req.params.code;
  const resultado = await Link.findOne({ where: { code } });
  
  if (!resultado) return res.sendStatus(404);

  // Renderiza as estatísticas
  res.render('stats', resultado.dataValues);
});

// Rota para redirecionar para o link original
router.get('/:code', async (req, res, next) => {
  const code = req.params.code;

  const resultado = await Link.findOne({ where: { code } });
  if (!resultado) return res.sendStatus(404);

  resultado.hits++;
  await resultado.save();

  console.log('Redirecionando para:', resultado.url); // Linha adicionada para depuração
  res.redirect(resultado.url);
});

// Função para gerar um código aleatório
function generateCode(){
  let text = '';
  const possible = 'qwertyuiopasdfghjklzxcvbnm1234567890';
  for(let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  
  console.log('Código gerado:', text); // Adicionado para depuração
  return text;
}

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Encurtador' });
});

/* POST para criar novo link encurtado */
router.post('/new', async (req, res, next) => {
  try {
    const url = req.body.url;

    if (!url) {
      return res.status(400).send('URL é obrigatória');
    }

    const code = generateCode();

    const resultado = await Link.create({
      url: url,
      code: code
    });

    res.render('stats', resultado.dataValues);
  } catch (error) {
    next(error); // Trata erros de forma adequada
  }
});

module.exports = router;
