
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

//gunakanejs
app.set('view engine', 'ejs');
app.use(expressLayouts)


app.get('/', (req, res) => {
    // res.send('Hello World!')

    // res.json({
    //     nama: 'Alif',
    //     email: 'alif@gmail.com',
    //     noHp: '085882218939'
    // })


    // res.sendFile('./index.html', { root: __dirname })


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
        nama: 'aAlifudinniko',
        title: 'home',
        mahasiswa: mahasiswa
    })
})

// app.get('/product/:id/category/:idCat', (req, res) => {
//     res.send(`Product ID :  ${req.params.id} 
//     <br> Categori ID ${req.query.category}`);
// })

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
