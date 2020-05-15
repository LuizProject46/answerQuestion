const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const conn = require("./database/db");
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")
//DATABASE

conn.authenticate().then(()=>{
    console.log("Conexão feita com sucesso!")
}).catch((error)=>{
    console.log(error)
})

//DIZ PARA O EXPRESS USAR O EJS COMO RENDERIZADOR
app.set("view engine","ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.get("/",(req,res)=>{
    
    Pergunta.findAll({raw:true,order:[
        ['id','DESC']
    ]}).then((perguntas)=>{
        res.render("index",{
            perguntas: perguntas
        })
    });
   
   

})

app.get("/perguntar",(req,res)=>{
   
    res.render("perguntar")
   

})



app.post("/salvarpergunta",(req,res)=>{
   
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    
    Pergunta.create({
       titulo: titulo,
       descricao: descricao 
    }).then(()=>{
        res.redirect("/")
    })
  
   

})
app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined ){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                raw: true,
                order: [['id','DESC']]

            }).then((resposta)=>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    resposta: resposta 
                })
            })
            
        }else{
            res.redirect("/")
        }
    })
   
   

})
app.post("/salvarresposta",(req,res)=>{
   
    var resposta = req.body.resposta
    var id = req.body.id    
    
    Resposta.create({
       corpo: resposta,
       perguntaId: id 
    }).then(()=>{
        res.redirect("/pergunta/"+id)
    })
  
   

})
app.listen(3001,()=>{
    console.log("Listening in port 3001...")
})