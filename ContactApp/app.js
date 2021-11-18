

// const (TulisPertanyaan, simpanContact} = require('./contacts.js')
const contacts = require('./contacts.js')

const main = async () => {
    const nama = await contacts.TulisPertanyaan('Masukan nama anda : ');
    const email = await contacts.TulisPertanyaan('Masukan email anda : ');
    const noHP = await contacts.TulisPertanyaan('Masukan no hp anda : ');

    contacts.save(nama, email, noHP);

}

main();

