
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { body, validationResult, check } = require('express-validator');

const { Load, findContact, addKontak, cekDuplikat, deleteContact, updateKontaks } = require('./utils/contacts')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')


const app = express()
const port = 3000
// const bootstrap = require('bootstrap');



//gunakanejs
app.set('view engine', 'ejs');

// Middleware--- Third-party middleware
app.use(expressLayouts)


// Middleware---- built in Middelware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

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
//halaman form tambah data kontak
app.get('/kontak/add', (req, res) => {
    res.render('add-kontak', {
        layout: 'layouts/main-layout',
        title: 'Form Tambah data Kontak',

    })
})

//Proses tambah data kontak
app.post('/kontak',
    [
        body('nama').custom((value) => {
            const duplikat = cekDuplikat(value)
            if (duplikat) {
                throw new Error('Nama kontak sudah digunakan')
            }
            return true
        }),
        check('email', 'Email tidak valid !').isEmail(),
        check('nohp', 'No HP tidak valid').isMobilePhone('id-ID')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            res.render('add-kontak', {
                title: 'Form Tambah Data Kontak',
                layout: 'layouts/main-layout',
                errors: errors.array()
            })

        } else {

            addKontak(req.body)
            req.flash('msg', 'Data  kontak berhasil ditambahkan!')
            res.redirect('/kontak')
        }



    })

//Proses delete contact

app.get('/kontak/delete/:nama', (req, res) => {
    const kontak = findContact(req.params.nama)

    //Jika Kontak tidak ada 
    if (!kontak) {
        res.status(404)
        res.send('<h1>404</h1>')

    } else {
        // res.send(req.params.nama)
        deleteContact(req.params.nama)
        req.flash('msg', 'Data  kontak berhasil dihapus!')
        res.redirect('/kontak')
    }
})


//Form ubah kontak

app.get('/kontak/edit/:nama', (req, res) => {

    const kontak = findContact(req.params.nama)
    res.render('edit-kontak', {
        layout: 'layouts/main-layout',
        title: 'Form Ubah data Kontak',
        kontak: kontak

    })
})

// Proses ubah data
app.post('/kontak/update',
    [
        body('nama').custom((value, { req }) => {
            const duplikat = cekDuplikat(value)
            if (value !== req.body.oldNama && duplikat) {
                throw new Error('Nama kontak sudah digunakan')
            }
            return true
        }),
        check('email', 'Email tidak valid !').isEmail(),
        check('nohp', 'No HP tidak valid').isMobilePhone('id-ID')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            res.render('edit-kontak', {
                title: 'Form Ubah Data Kontak',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                kontak: req.body
            })

        } else {

            updateKontaks(req.body)
            req.flash('msg', 'Data  kontak berhasil diubah !')
            res.redirect('/kontak')
        }



    })

//halaman detail kontak
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
        msg: req.flash('msg'),
    })
})


app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h>')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
