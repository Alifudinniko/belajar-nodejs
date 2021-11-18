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



const LoadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}


const save = (nama, email, noHP) => {
    const kontaks = { nama, email, noHP };
    // const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(fileBuffer);
    const contacts = LoadContact();
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

const listContact = () => {
    const contacts = LoadContact();
    console.log(chalk.cyan.bold('Daftar Kontak'));
    contacts.forEach((kontak, i) => {
        console.log(`${i + 1}. ${kontak.nama} - ${kontak.noHP}`)
    })
};

const detailContact = (nama) => {
    const contacts = LoadContact();
    const kontak = contacts.find((kon) => kon.nama.toLowerCase() === nama.toLowerCase())

    if (!kontak) {
        console.log(chalk.red.bold(`${nama} tidak ditemukan !`));
        return false;
    };
    console.log(chalk.green.bold(kontak.nama));
    console.log(kontak.email)
};

const deleteContact = (nama) => {
    const contacts = LoadContact();
    const newContacts = contacts.filter((kontak) =>
        kontak.nama.toLowerCase() !== nama.toLowerCase())
    console.log(newContacts);
    if (contacts.length === newContacts.length) {
        console.log(chalk.red.bold(`${nama} tidak ditemukan !`));
        return false;
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.green.bold(`data kontak ${nama} berhasil dihapus !`));
}

module.exports = { save, listContact, detailContact, deleteContact };