
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    // res.send('Hello World!')

    // res.json({
    //     nama: 'Alif',
    //     email: 'alif@gmail.com',
    //     noHp: '085882218939'
    // })

    res.sendFile('./index.html', { root: __dirname })

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
    // res.send('Ini adalah halaman about sejk')
    res.sendFile('./about.html', { root: __dirname })
})
app.get('/kontak', (req, res) => {

    res.sendFile('./contact.html', { root: __dirname })
})


app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h>')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
