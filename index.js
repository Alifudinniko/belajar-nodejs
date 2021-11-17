// console.log('Hai');
// const nama = 'Alif';
// console.log(nama);

// const namaa = (nama) => {
//     return `Hi nama saya ${nama}`;
// };

// console.log(namaa(nama));





// const fs = require('fs'); //core module
// const cetak = require('./coba.js'); //local Module
// const moment = require('moment');  //Third Party Module / npm module / node module

const coba = require('./coba');


console.log(coba);
console.log(
    coba.cetakNama('aku'),
    coba.PI,
    coba.mahasiswa.cetakMhs(),
    new coba.Orang()
);








// console.log(cetak('Alifudinniko'));