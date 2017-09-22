var faker = require("faker");

let greeting = `
===================
WELCOME TO MY SHOP!
===================
`;

console.log(greeting);

for (var i = 0; i < 10; i++){
    console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
}
