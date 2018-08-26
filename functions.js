'use strict';

function createMatrix(string = "0 0 0;1 1 1") {
    let result = [],
        rowsOfMatrix,
        firstRow,
        i,
        counter = 0,
        row;

    // Проверка передаваемого аргумента
    if (!__isValid(string)) {
        throw {
            name: "Error",
            message: "Invalid value must be \"number number number\" like \"1 1 1\" or \"1 1 1;1 1 1;...\""
        };
    }

    // Если матрица в одну строку, то вернуть результат
    if ( string.indexOf(";") === -1 ) {
        result = string.split(' ');
        result = result.map(function (element) {
            return Number(element);
        });

        return result; 
    }
    
    // Убрать лишние пробелы и получить массив будущих строк матрицы
    // определить первую строку матрицы
    string = string.trim();
    rowsOfMatrix = string.split(';');

    firstRow = (rowsOfMatrix.shift())
                            .trim()
                            .split(' ');

    for (i = 0; i < firstRow.length; i++) {
        result[i] = [];
        result[i].push(firstRow[i]);
    }
    
    // Генерация слудущих строк матрицы (многомерного массива)
    // удаления лишних пробелов в строках
    while (counter < rowsOfMatrix.length) {
        rowsOfMatrix[counter] = rowsOfMatrix[counter].trim();
        row = rowsOfMatrix[counter].split(' ');

        for (i = 0; i < result.length; i++) {
            result[i].push(row[i]);
        }

        counter++;
    }

    // Привидение элементов массивов к числовому типу
    for (i = 0; i < result.length; i++) {
        result[i] = result[i].map(function (element) {
            return Number(element);
        });
    }
    
    return result;

    function __isValid(arg) {
        
        if (typeof arg !== "string") {
            return false;
        }
        
        return true;
    }
}
var matrix = createMatrix(" 1 1 1 ; 2 2 2 ; 3 3 3 ; 4 4 4 ");
console.log(matrix);