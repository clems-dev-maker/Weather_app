import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import env from "dotenv"

const app = express();
const port = 3000;
env.config();
const apiKey = process.env.API_KEY

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async (req,res) => {
    const city = req.query.city || 'Castres'
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try{
        const response = await axios.get(url);
        const weather = response.data;
        weather.main.temp = Math.floor(weather.main.temp - 273.15)  // Convert temperature in degree Celsius
        res.render('index.ejs', {weather: weather});
    } catch (error) {
        res.render('error', {error: error.toString()})
    }
});


app.get('/about', (req, res) => {
    res.render('about.ejs')
})


app.post('/', async (req, res) => {
    const city = req.body.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await axios.get(url)
        const weather = response.data;
        weather.main.temp = Math.floor(weather.main.temp - 273.15)  // Convert temperature in degree Celsius
        res.render('index', {weather: weather} )
    } catch (error) {
        res.render('error', {error: error.toString()})
    }
})

app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
})