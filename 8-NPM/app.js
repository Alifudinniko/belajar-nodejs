console.log('Hello');

const validator = require('validator');
const chalk = require('chalk');

console.log(validator.isEmail('alif@gmail.com'));
console.log(validator.isMobilePhone('085882218939', 'id-ID'));
console.log(validator.isNumeric('085882218939'));


console.log(chalk.blue('Hello world'));
console.log(chalk.bgBlue('Hello world'));
console.log(chalk.black.bgBlue('Hello world'));
console.log(chalk.italic.black('Hello world'));

const pesan = chalk`coba {bgBlue.black coba }`;
console.log(chalk.bgRed.black(pesan));


