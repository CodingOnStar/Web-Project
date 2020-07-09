var items = ["Foo", "j1h2", "jhx", "four"];
let index = items.splice(0, 1, items[2])
console.log(index);
console.log(items)
items.splice(2, 1, ...index)
console.log(items)