//Core Module
//FIle System

const fs = require('fs');

// fs.writeFileSync('test.txt', 'Hello world secara synchronous');
// fs.mkdirSync('coba/apa.txt', 'Semangat buat kmu');



// // menuliskan string ke file (Synchronous)
// try {
//     fs.writeFileSync('coba/apa.txt', 'Semangat buat kmu');
// }
// catch (e) {
//     console.log(e);
// }

// // Menulisan string ke file (asynchronous)
// fs.writeFile('coba/apa.txt', 'Hello world secara asynchronous', (e) => {
//     console.log(e);
// });


// //Membaca isi File (Synchronous)
// const data = fs.readFileSync('coba/apa.txt', 'utf-8');
// // console.log(data.toString());
// console.log(data);


// // // Membaca isi File (Asychornous)
// fs.readFile('coba/apa.txt', 'utf-8', (error, data) => {
//     if (error) throw error;
//     console.log(data);
// });


// //ReadLine
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});



rl.question('Masukkan nama anda:', (nama) => {
    rl.question('Masukkan No Hp:', (nohp) => {
        const Hasil = {
            nama: nama,
            nohp: nohp
        };
        const file = fs.readFileSync('coba/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);
        contacts.push(Hasil);

        fs.writeFile('coba/contacts.json', JSON.stringify(contacts), (e) => {
            console.log(e);

        });
        console.log('Terimaksih');

        rl.close();
    });
});

