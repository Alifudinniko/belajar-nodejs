
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000
// const bootstrap = require('bootstrap');


//gunakanejs
app.set('view engine', 'ejs');

//Third-party middleware
app.use(expressLayouts)
app.use(morgan('dev'))

//built in Middelware
app.use(express.static('public'));

// //Application Level Midlleware
// app.use((req, res, next) => {
//     console.log('Time:', Date.now())
//     next()
// })




app.get('/', (req, res) => {

    const mahasiswa = [
        {
            nama: 'alif',
            nim: '1212'
        },
        {
            nama: 'niko',
            nim: '1222'
        },
        {
            nama: 'lili',
            nim: 121212
        }
    ]

    res.render('index', {
        layout: 'layouts/main-layout',
        nama: 'aAlifudinniko',
        title: 'home',
        mahasiswa: mahasiswa
    })
})


app.get('/product/:id', (req, res) => {
    res.send(`Product ID :  ${req.params.id} 
    <br> Categori ${req.query.category}`);
})
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman About'
    })

})

app.get('/kontak', (req, res) => {

    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'kONTAK'
    })
})


app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h>')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
