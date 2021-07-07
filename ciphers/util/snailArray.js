export class SnailArray {

    constructor() {

    }

    snail(array) {

        var list = [];

        var array = array[0].map(function (col, i) {
            return array.map(function (row) {
                return row[i];
            });
        });

        list.push(array[0]);
        array.shift();

        while (typeof array[0] !== 'undefined') {

            var array = array[0].map(function (col, i) {
                return array.map(function (row) {
                    return row[i];
                });
            });

            array.reverse();
            list.push(array[0]);
            array.shift();
        }
        return list;
    }

}
