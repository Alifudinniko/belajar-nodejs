// Mengambil argument dari command line

const { argv } = require("process");
const yargs = require("yargs");
const contacts = require('./contacts.js')

// const command = process.argv[2];

// if (command === 'add') {

// } else if (command === 'remove') {
// }
// console.log(process.argv);


// console.log(yargs.argv);
// yargs.command('add', 'Menambahkan kontak baru', () => {

// }, (argv) => {
//     console.log(argv.nama);
// }
// )


yargs.command({
    command: 'add',
    describe: 'menambahkan kontak baru',
    builder: {
        nama: {
            describe: "nama lengkap",
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'Nomor Hnadphone',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        // const kontak = {
        //     nama: argv.nama,
        //     email: argv.email,
        //     noHP: argv.noHP
        // };
        // console.log(kontak);
        contacts.save(argv.nama, argv.email, argv.noHP);

    }
})
    .demandCommand();

//Menampilkan daftar semua nama contact (nama &no Hp)
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & no HP',
    handler() {
        contacts.listContact();

    },
});



//Menampilkan detail sebuah kontak
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah contack berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        contacts.detailContact(argv.nama);

    },
});


// Menghapus kontak berdasarkan Nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);

    },
});

yargs.parse();








// const (TulisPertanyaan, simpanContact} = require('./contacts.js')


// const main = async () => {
//     const nama = await contacts.TulisPertanyaan('Masukan nama anda : ');
//     const email = await contacts.TulisPertanyaan('Masukan email anda : ');
//     const noHP = await contacts.TulisPertanyaan('Masukan no hp anda : ');

//     contacts.save(nama, email, noHP);

// }

// main();

