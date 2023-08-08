const S = require('string');

function tratarErrosEsperados(res, err) {

    // Entrar quando o mongoose der algum erro
    if (String(err).includes('ValidationError:')) {
        return res.status(400).json({
            status: "Error",
            statusMensagem: S(String(err).replace("ValidationError: ", "")).replaceAll(':','').s,
            resposta: String(err) //Por motivo de seguranca e' bom apagar essa linha 'resposta: String(err)' para nao expor qual o motivo do erro em producao
        });
    }

    // Pode ser um erro definido manualmente por mim
    if (String(err).includes('Error:')) {
        return res.status(400).json({
            status: "Erro",
            statusMensagem: String(err).replace("Error: ", ""),
            resposta: String(err) //Por motivo de seguranca e' bom apagar essa linha 'resposta: String(err)' para nao expor qual o motivo do erro em producao
        });
    }

    // Erro inesperado    
    console.error(err);
    return res.status(500).json({
        status: "Erro",
        statusMensagem: "Houve um problema inesperado, tente novamente mais tarde.",
        resposta: String(err) //Por motivo de seguranca e' bom apagar essa linha 'resposta: String(err)' para nao expor qual o motivo do erro em producao
    });
}

module.exports = tratarErrosEsperados;