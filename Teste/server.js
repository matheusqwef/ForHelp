const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Middleware para interpretar os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para processar o formulário
app.post('/cadastro', (req, res) => {
    const dadosUsuario = req.body;

    // Formatar os dados para salvar no arquivo .txt
    const dadosFormatados = `
        Nome: ${dadosUsuario.nome}
        Sobrenome: ${dadosUsuario.sobrenome}
        CPF: ${dadosUsuario.cpf}
        Data de Nascimento: ${dadosUsuario.nascimento}
        Sexo: ${dadosUsuario.sexo}
        Celular: ${dadosUsuario.celular}
        Email: ${dadosUsuario.email}
        RG: ${dadosUsuario.rg}
        Peso: ${dadosUsuario.peso}
        Altura: ${dadosUsuario.altura}
        Nome do Responsável: ${dadosUsuario.nome_responsavel || 'N/A'}
        Sobrenome do Responsável: ${dadosUsuario.sobrenome_responsavel || 'N/A'}
        CPF do Responsável: ${dadosUsuario.cpf_responsavel || 'N/A'}
        Data de Nascimento do Responsável: ${dadosUsuario.nascimento_responsavel || 'N/A'}
        Email do Responsável: ${dadosUsuario.email_responsavel || 'N/A'}
        Celular do Responsável: ${dadosUsuario.celular_responsavel || 'N/A'}
        -------------------------\n
    `;

    // Salvar os dados no arquivo "cadastros.txt"
    fs.appendFile('cadastros.txt', dadosFormatados, (err) => {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
            return res.status(500).send('Erro ao processar o cadastro');
        }
        console.log('Dados salvos com sucesso!');
        res.send('Cadastro realizado com sucesso!');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
