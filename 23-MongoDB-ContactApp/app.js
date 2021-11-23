const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override')
require('./utils/db')
const Contact = require('./model/contact')


const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000

// Setup override
app.use(methodOverride('_method'))

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
        body('nama').custom(async (value) => {
            const duplikat = await Contact.findOne({ nama: value })
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

            res.render('add-kontak', {
                title: 'Form Tambah Data Kontak',
                layout: 'layouts/main-layout',
                errors: errors.array()
            })

        } else {

            Contact.insertMany(req.body, (error, result) => {
                req.flash('msg', 'Data  kontak berhasil ditambahkan!')
                res.redirect('/kontak')
            })

        }



    })

// //Proses delete contact
// app.get('/kontak/delete/:nama', async (req, res) => {
//     const kontak = await Contact.findOne({ nama: req.params.nama })

//     //Jika Kontak tidak ada 
//     if (!kontak) {
//         res.status(404)
//         res.send('<h1>404</h1>')

//     } else {
//         // res.send(req.params.nama)
//         // Contact.deleteOne({ nama: req.params.nama })
//         Contact.deleteOne({ _id: kontak._id }).then((result) => {

//             req.flash('msg', 'Data  kontak berhasil dihapus!')
//             res.redirect('/kontak')
//         })

//     }
// })
app.delete('/kontak', (req, res) => {
    // res.send(req.body)
    Contact.deleteOne({ nama: req.body.nama }).then((result) => {

        req.flash('msg', 'Data  kontak berhasil dihapus!')
        res.redirect('/kontak')
    })

})

//Form ubah kontak
app.get('/kontak/edit/:nama', async (req, res) => {

    const kontak = await Contact.findOne({ nama: req.params.nama })
    res.render('edit-kontak', {
        layout: 'layouts/main-layout',
        title: 'Form Ubah data Kontak',
        kontak: kontak

    })
})

// Proses ubah data
app.put('/kontak',
    [
        body('nama').custom(async (value, { req }) => {
            const duplikat = await Contact.findOne({ nama: value })
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
            res.render('edit-kontak', {
                title: 'Form Ubah Data Kontak',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                kontak: req.body
            })

        } else {

            Contact.updateOne(
                {
                    _id: req.body._id
                },
                {
                    $set: {
                        nama: req.body.nama,
                        email: req.body.email,
                        nohp: req.body.nohp
                    }
                }
            ).then((result) => {
                req.flash('msg', 'Data  kontak berhasil diubah !')
                res.redirect('/kontak')
            })

        }



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



