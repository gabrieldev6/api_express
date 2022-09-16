// inclusao dos pacotes
const express = require('express')
const mysql = require('mysql2')

// instancia o express
const app = express()

// definicao de porta
const port = 3006

// abrindo conexao com base de dados
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'sistema_noticia'
})

connection.connect()



// servico de hello wworld
app.get('/', (req, res)=>{
    res.send('hello world!')
})

//servico de busca de categorias
app.get('/new-api/v1/categorias', (req, res)=>{
    //busca categoria no banco de dados
    connection.query(`SELECT id, nome FROM sistema_noticia.categorias`, function(err, rows, fields) {
    
    //parametros a serem executados
    //1: string com a funcao sql que vai ser executado no banco
    //2: funcao callback que vai ser executada, que por sua vez
    //recebera uma mensagem de erro se houver
    //as linhas que foram pesquisadas a partir da funcao sql
    
        if (err) throw err
        res.send(rows)
    })

})
//servico de busca de noticias
app.get('/new-api/v1/categorias/:categoriaId/noticias', (req, res) => {
    
    connection.query(`SELECT * FROM sistema_noticia.noticia WHERE id = ${req.params.categoriaId}`, function(err, rows, fields) {
        
        if (err) throw err
        res.send(rows[0])

    })

})


// subindo servidor node
app.listen(port, ()=>{
    console.log(`Exaple app listening at http://localhost:${port}`)
})