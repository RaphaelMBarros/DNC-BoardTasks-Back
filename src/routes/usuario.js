const express = require('express');
const conectarBancoDados = require('../middlewares/conectarBD');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EsquemaUsuario = require('../models/usuarios.js');
const router = express.Router();


router.post('/criar', conectarBancoDados, async function(req, res) {
  try {
    // #swagger.tags = ['Usuario']
    let { nome, email, senha } = req.body;
    const numeroVezesHash = 10;
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash);
    const respostaBd = await EsquemaUsuario.create({nome, email, senha: senhaHash});

    res.status(200).json({
      status: "OK",
      statusMensagem: "Usuario criado com sucesso.",
      resposta: respostaBd
    })

  } catch (error) {
    if (String(error).includes("email_1 dup key")){
      return tratarErrosEsperados(res, "Error: Ja' existe uma conta com este e-mail.");
    }
    return tratarErrosEsperados(res, error);
  }
});

router.post('/logar', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Usuario']
    let { email, senha } = req.body;

    let respostaBD = await EsquemaUsuario.findOne({ email }).select('+senha');
    if(respostaBD) {
      let senhaCorreta = await bcrypt.compare(senha, respostaBD.senha);
      if(senhaCorreta) {

        let token = jwt.sign({ id: respostaBD._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.header('x-auth-token', token);
        res.status(200).json({
          status: "OK",
          statusMensagem: "Usuario autenticado com sucesso.",
          resposta: { "x-auth-token": token }
        });
      } else {
        throw new Error("E-mail ou senha incorreto");
      }
    } else {
      throw new Error("E-mail ou senha incorreto");
    }
  } catch (err) {
    return tratarErrosEsperados(res, err);
  }
});

module.exports = router;
  
