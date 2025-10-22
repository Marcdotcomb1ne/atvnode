const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const produtosRoutes = require('./routes/produtos');

const app = express();
const PORT = 3009;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/produtos', produtosRoutes);

app.get('/', (req, res) => {
  res.redirect('/produtos');
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Banco de dados sincronizado');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar banco:', err);
  });