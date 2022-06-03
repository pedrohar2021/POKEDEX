const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
    {
        id: 1,
        nome: "Bulbasaur",
        tipo: "Grass",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
    },
    {
        id: 2,
        nome: "Charmander",
        tipo: "Fire",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
    },
    {
        id: 3,
        nome: "Squirtle",
        tipo: "Water",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png"
    },
    {
        id: 4,
        nome: "Pikachu",
        tipo: "Eletric",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
    }

];





let pokemon = undefined;

app.get("/", (req, res) => {
    res.render('home');

});

app.get("/cadastro", (req,res) => {
    res.render('cadastro')
})



app.get("/index", (req, res) => {
    res.render('index', {pokedex, pokemon, mensagem});

});

let mensagem = "";

app.post("/create", (req, res) => {
    const pokemon = req.body;
    pokemon.id = pokedex.length + 1
    pokedex.push(pokemon)
    mensagem = "POKEMON CADASTRADO!"
    res.redirect("/index#cards")
});

// app.get("/detalhes/:id" , (req,res) =>{
//     const id = +req.params.id;
//     pokemon = pokedex.find(pokemon => pokemon.id === id);
//     res.redirect("/index#cadastro");
// })

// app.post("/update/:id", (req,res) =>{
//     const id = +req.params.id -1;
//     const newPokemon = req.body
//     newPokemon.id = id + 1
//     pokedex[id] = newPokemon
//     pokemon = undefined
//     res.redirect("/index#cards");
// });

app.get("/delete/:id", (req,res) => {
    const id = +req.params.id -1

    delete pokedex[id]
    res.redirect("/index#cards");

})


app.listen(port, () => console.log('Servidor rodando em http://localhost:3000'));