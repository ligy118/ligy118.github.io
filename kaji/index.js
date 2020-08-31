function sum(type) {
    console.log("click"+String(type))
    switch (type) {
        case 0:
            for (var k = 1; k <= 6; k++) {
                column_counter(k);

            }
            default:
                column_counter(type)


    }
}

function column_counter(row) {
    var sum = 0;
    for (i = 2; i <= 7; i++) {
        temp = document.getElementById("a" + String(row) + i)
        sum += isNaN(Number(temp.value)) ? 0: Number(temp.value)

    }
    console.log(sum);
    document.getElementById("a" + String(row) + "1").innerHTML = sum
}