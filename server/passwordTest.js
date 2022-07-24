const bcrypt = require('bcrypt');

let pswrd = bcrypt.hashSync('test1_usr', 9);
console.log(bcrypt.compareSync('123456', pswrd));
console.log(pswrd);

// const val = [ ...Array(10).keys() ].map((i)=>);
console.log(val);