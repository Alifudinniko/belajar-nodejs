console.log('Heloo corld');

function cetakNama(nama) {
    return `Halo nama saya ${nama}`;
}

const PI = 3.14;


const mahasiswa = {
    nama: 'Alfudin',
    umur: 20,
    cetakMhs() {
        return ` Halo nama saya ${this.nama} dan saya ${this.umur} tahun.`;
    }
}

class Orang {
    constructor() {
        console.log('objek orang telah dibuat');
    }
}

// module.exports.cetaknama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// module.exports = {
//     // properti : value
//     cetaknama: cetakNama,
//     PI: PI,
//     mahasiswa: mahasiswa,
//     Orang: Orang()
// };

module.exports = { cetakNama, PI, mahasiswa, Orang };