
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { Load, findContact } = require('./utils/contacts')

const app = express()
const port = 3000
// const bootstrap = require('bootstrap');


//gunakanejs
app.set('view engine', 'ejs');

//Third-party middleware
app.use(expressLayouts)


//built in Middelware
app.use(express.static('public'));


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
        nama: 'Alifudinniko',
        title: 'Halaman Home',
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
app.get('/kontak/:nama', (req, res) => {
    const kontak = findContact(req.params.nama)
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Halaman Detail Kontak',
        kontak,
    })
})

app.get('/kontak', (req, res) => {
    const kontaks = Load()
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Halaman Kontak',
        kontaks,
    })
})


app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h>')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
