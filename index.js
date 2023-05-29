const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = { customCssUrl: '/swagger-ui.css'};
const routes = require('./src/routes');
const app = express();
require('dotenv').config();
/* O trecho acima são as importações */

/* O trecho abaixo são as configurações do express */
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* O trecho abaixo é a rota do swagger, para documentação */
if(process.env.NODE_ENV !== 'test') {
    const swaggerFile = require('./swagger_output.json');
    app.get('/', (req, res) => { /* #swagger.ignore = true */ res.redirect('/doc');});
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions));
}


/* O código é onde estão as rotas da API */
routes(app);


/* O trecho abaixo é a inicialização do servidor */
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;

