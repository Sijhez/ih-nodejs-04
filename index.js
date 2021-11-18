// 1. IMPORTACIONES
const express = require("express")
const app = express()
const hbs = require("hbs")
const PunkAPIWrapper = require("punkapi-javascript-wrapper");//creamos nueva class con el punkAPI refiriendonos al appi de base sde datos de punkapi
const punkAPI = new PunkAPIWrapper();//generamos una instancia para poder acceder a esta class

require("dotenv").config()

//2. MIDDLEWARES
app.use(express.static('public')) //activamos carpeta public, permite entrar a archivos e imagenes

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

hbs.registerPartials(__dirname + "/views/partials")


// 3. RUTAS
app.get("/", (req, res) => {
	res.render("home")
})

app.get("/random-beer", (req, res) => {
    const randomBeers = punkAPI.getRandom()
    randomBeers
    .then((beers)=>{
        res.render("random-beer",{
            cheve:beers 
        })
    })
})

app.get("/beers", (req, res) => {
   //generacion de promesas
    const listBeers = punkAPI.getBeers()
    
    //evaluacion de promesa, si se cumple es .then, si no es .catch
    listBeers
    .then((beers) => { // SI LA PROMESA SE CUMPLIÓ EXITOSAMENTE
        //console.log(beers)
        res.render("beers",{
            cheve:beers
        })
    })
    .catch((error) => { // SI LA PROMESA NO SE CUMPLIÓ. ROMPISTE MI CORAZÓN.
        console.log(error)
    })
  
        //console.log(punkAPI) //aqui confirmamos nomas que la instancia funciona


})






// 4. SERVIDOR
app.listen(process.env.PORT, () => {
	console.log(`Servidor activo en puerto ${process.env.PORT}`)
})