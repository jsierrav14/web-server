const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../templates/partials')
const app = express();
const port = process.env.PORT ||  3000;

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));
app.use('/help', express.static(publicDirectoryPath));
app.use('/about', express.static(publicDirectoryPath));

app.get('', (req, response) => {
    response.render('index.hbs', {
        title: "Weather App",
        name: "Jose Eduardo"
    })
})

app.get('/about', (req, response) => {

    response.render('about', {
        title: 'About',
        img: 'img/profile.png',
        name: 'Jose Eduardo Sierra Vargas'

    })
})

app.get('/help', (req, response) => {
    response.render('help',
        {
            title: 'Help',
            name: 'Jose Eduardo Sierra Vargas'
        }
    )
})

app.get('/help/*', (req, response) => {
    response.render('404',
        {
            title: 'Weather app',
            name: 'Jose Eduardo Sierra Vargas',
            error: 'Help article not found'
        }
    )
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
    
        return res.send({error:'You have provide an address'})

    } else {

        geocode(address, (error, { lat, lng } = {}) => {
            console.log('Error', error);

            if (error) {

                return res.send({error:'An error has ocurred'})
            }


            forecast(lat, lng, (error, forescastData) => {
                if (error) {
                    return console.log(error);
                }
                const { summary, temperature, precipProbability } = forescastData;

                res.send({
                    summary:summary,
                    temperature:temperature,
                    precipProbability:precipProbability
                })

            })



        })
    }

})
/*app.get('*', (req, res) => {
    res.render('404', {
        
        title: 'Weather app',
        name: 'Jose Eduardo Sierra Vargas',
        error: 'page not found',
        
    })
})*/

app.get('/product', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must providea search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port);
})