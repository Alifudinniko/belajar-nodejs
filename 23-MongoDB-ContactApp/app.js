const express = require('express')
const expressLayouts = require('express-ejs-layouts')

require('./utils/db')
const Contact = require('./model/contact')


const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000


//set Up ejs
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Mongo Contact App | Listening at http://localhost:${port}`)
})

//Konfigurasi Flash
app.use(cookieParser('secret'))
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

app.get('/', (req, res) => {

    res.render('index', {
        layout: 'layouts/main-layout',
        nama: 'Alifudinniko',
        title: 'Selamat Datang',
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman About'
    })
})

app.get('/kontak', async (req, res) => {
    const kontaks = await Contact.find()

    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Halaman Kontak',
        kontaks,
        msg: req.flash('msg'),
    })
})

//halaman detail kontak
app.get('/kontak/:nama', async (req, res) => {
    // const kontak = findContact(req.params.nama)
    const kontak = await Contact.findOne({ nama: req.params.nama })


    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Halaman Detail Kontak',
        kontak,
    })
})



