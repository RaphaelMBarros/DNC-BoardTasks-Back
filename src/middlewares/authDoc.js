async function authDocProducao(req, res, next){
    const { senhaDigitada } = req.body;

    if(req.headers.host.includes('localhost') || req.originalUrl !== "/doc/") {
        // Usuário está no localhost
        return next();
    }

    if(senhaDigitada === process.env.SWAGGER_SENHA_DOC) {
        // Usuário digitou a senha certa
        return next();
    }

    if(senhaDigitada){
        // Usuário digitou a senha errada
        res.status(401).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method = "post"> 
                <p style = "color: red;"> Senha Errada!</p>
                <lable for = "senha">Senha da documentação</label>
                <input type = "password" name = "senhaDigitada" id = "senhaDigitada" />
                <button type = "submit">Entrar</button>
            </form>
        `))
    } else {
        // Usuário ainda não digitou a senha e está em modo produção 
        res.status(200).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method = "post"> 
                <lable for = "senha">Senha da documentação</label>
                <input type = "password" name = "senhaDigitada" id = "senhaDigitada" placeholder="Senha para acessar a doc da API"/>
                <button type = "submit">Entrar</button>
            </form>
        `))
    }
}

module.exports = authDocProducao;