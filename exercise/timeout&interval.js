function printNumbers(from, to) {
    for (let i = from; i < to - from; i++) {
        setInterval(() => {
            console.log(i);
        }, 1000);
    }
}
printNumbers(10, 15)