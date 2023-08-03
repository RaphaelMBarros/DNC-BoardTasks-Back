const express = require('express');
const conectarBancoDados = require('../middlewares/conectarBD');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const EsquemaTarefa = require('../models/tarefas');
const authUser = require('../middlewares/authUser');
const router = express.Router();


router.post('/criar', authUser, conectarBancoDados, async function(req, res) {
  try {
    // #swagger.tags = ['Tarefa']
    let { posicao, titulo, descricao, status, dataEntrega } = req.body;
    
    const usuarioCriador = req.usuarioJwt.id;
    
    const respostaBd = await EsquemaTarefa.create({posicao, titulo, descricao, status, dataEntrega, usuarioCriador});

    res.status(200).json({
      status: "OK",
      statusMensagem: "Tarefa criada com sucesso.",
      resposta: respostaBd
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});


router.put('/editar/:id', authUser, conectarBancoDados, async function(req, res) {
  try {
    // #swagger.tags = ['Tarefa']
    let idTarefa = req.params.id;
    let { posicao, titulo, descricao, status, dataEntrega } = req.body;
    
    const usuarioLogado = req.usuarioJwt.id;
    
    const checkTarefa = await EsquemaTarefa.findOne({ _id: idTarefa, usuarioCriador: usuarioLogado });
    if(!checkTarefa) {
      throw new Error("Tarefa nao encontrada ou pertence a outro usuario");
    }

    const tarefaAtualizada = await EsquemaTarefa.updateOne({ _id: idTarefa },  { posicao, titulo, descricao, status, dataEntrega });
    if(tarefaAtualizada.modifiedCount > 0){
      const dadosTarefa =await EsquemaTarefa.findOne({ _id: idTarefa}).populate('usuarioCriador');

      res.status(200).json({
        status: "OK",
        statusMensagem: "Tarefa alterada com sucesso.",
        resposta: dadosTarefa    })
  
    }

   
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});


module.exports = router;
