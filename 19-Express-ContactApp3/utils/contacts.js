const fs = require('fs');

// Membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Memmbuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// Ambil semua data di contact.json
const Load = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}


// Cari kontak berdasaran nama
const findContact = (nama) => {
    const contacts = Load()
    const kontak = contacts.find((kontak) => kontak.nama.toLowerCase() === nama.toLowerCase())
    console.log(kontak)
    return kontak
}



// Menuliskan /Menimpa file contacts.json dengan data yang baru
const saveContacts = (kontak) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(kontak))
}

//stringfy objek ke string
//parse string ke objek

// Menambahkan data kontak baru
const addKontak = (kontak) => {
    const contacts = Load()
    contacts.push(kontak)
    saveContacts(contacts)
}


//Cek nama yang duplikat
const cekDuplikat = (nama) => {
    const kontaks = Load()
    return kontaks.find((kontak) => kontak.nama === nama)
}

//Hapus kontak
const deleteContact = (nama) => {
    const kontaks = Load()
    const filteredContacts = kontaks.filter((kontak) => kontak.nama !== nama)
    saveContacts(filteredContacts)
}

//Mengubah kontaks
const updateKontaks = (kontakBaru) => {
    const kontaks = Load()

    //Hilangkan kontak lama yang namanya sama dengan old Nama
    const filteredContacts = kontaks.filter((kontak) => kontak.nama !== kontakBaru.oldNama)
    console.log(filteredContacts, kontakBaru)
    delete kontakBaru.oldNama
    filteredContacts.push(kontakBaru)

    saveContacts(filteredContacts)
}

module.exports = { Load, findContact, addKontak, cekDuplikat, deleteContact, updateKontaks }
