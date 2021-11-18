const fs = require('fs');
const readline = require('readline');

const { rejects } = require('assert');
const { mkdir } = require('fs');
const { resolve } = require('path/posix');



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//Membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

//Memmbuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}


const pertanyaan1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Masukkan nama anda:', (nama) => {
            resolve(nama);
        });
    });
}
const pertanyaan2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Masukkan email anda anda:', (email) => {
            resolve(email);
        });
    });


}


const TulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        });
    });

}

const save = (nama, email, noHP) => {
    const kontaks = { nama, email, noHP };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    contacts.push(kontaks);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('Terimaksih');
    rl.close();


}

module.exports = { TulisPertanyaan, save };