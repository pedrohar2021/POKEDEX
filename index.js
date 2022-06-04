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
        descricao: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
        tipo: "Grass",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
    },
    {
        id: 2,
        nome: "Charmander",
        descricao: "It has a preference for hot things. When rains, steam is said to spout from the tip of its tail.",
        tipo: "Fire",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
    },
    {
        id: 3,
        nome: "Squirtle",
        descricao: "When it retracts its long neck retracts its into its shell, it squirts out water with vigorous force.",
        tipo: "Water",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png"
    },
    {
        id: 4,
        nome: "Pikachu",
        descricao: "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
        tipo: "Eletric",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
    }

];





let pokemon = undefined;
let mensagem = "";

app.get("/", (req, res) => {
    res.render('home');

});

app.get("/cadastro", (req,res) => {
    res.render('cadastro')
})



app.get("/index", (req, res) => {
    res.render('index', {pokedex, pokemon, mensagem});
    mensagem = ''

});


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

// let mensagem2 = ''
// app.post("/apagar", (req,res) => {
//     mensagem2 = 'POKEMON EXCLUIDO'
//     delete pokedex[id]
//     res.redirect("/index#cards");

// })


app.get("/delete/:id", (req,res) => {
    const id = +req.params.id -1
    mensagem = "POKEMON DELETADO!"
    delete pokedex[id]
    res.redirect("/index#cards");

})


app.listen(port, () => console.log('Servidor rodando em http://localhost:3000'));