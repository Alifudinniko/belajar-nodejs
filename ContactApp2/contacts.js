const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

const { rejects } = require('assert');
const { mkdir } = require('fs');
const { resolve } = require('path/posix');





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






const save = (nama, email, noHP) => {
    const kontaks = { nama, email, noHP };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    //cek duplikat
    const duplikat = contacts.find((kontak) => kontak.nama === nama);
    if (duplikat) {
        console.log(chalk.red.bold('contak udah ada gunakan nama yang lain!'));
        return false

    }


    //cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.bold('email tidak valid!'));
            return false;
        }
    }

    //cek Hp
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red.bold('Nomor HP tidak valid'));
        return false;
    }

    contacts.push(kontaks);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.bold('Berhasil Menambahkan'));




}




module.exports = { save };