const fs = require('fs');

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

//Ambil semua data di contact.json
const Load = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}


//Cari kontak berdasaran nama
const findContact = (nama) => {
    const contacts = Load()
    const kontak = contacts.find((kontak) => kontak.nama.toLowerCase() === nama.toLowerCase())
    console.log(kontak)
    return kontak
}

module.exports = { Load, findContact }
