//creating a basic server
const path = require('path')
const express = require ('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// Setup route handlers
app.get('', (req, res) => { // string , function
    res.render('index', {
        title: 'Weather',
        name: 'Jessica Walker'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jessica Walker'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpfulText: 'This is some helpful text.',
        title: 'Help',
        name: 'Jessica Walker'
    })
})


// req means request from user
// res means response from server


app.get('/weather', (req, res) => {
    res.send([{
        forecast: 'Rainy',
        location: 'Carlsbad, CA'
    }, {
        forecast: 'Snowy',
        location: 'Prescott, AZ'
    }])
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


// res.send is the method for responding from our server to a request from a browser or someone providing a coded request from our library

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jessica Walker',
        errorMessage: "Help article not found."
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jessica Walker',
        errorMessage: 'Page not found.'
    })
}) 

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

//server stays up until we shut it down to allow for others to make requests.  Use control c to exit
