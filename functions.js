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


function deleteSpaces(string) {
    let isStartOfString = true, // Switcher or flag for logic expression
        counterOfSpaces = 0;

    string = string.replace(/ /g, (str, offset, input) => {
        //  if in start of string there are not 
        if (isStartOfString === true && offset !== 0 && counterOfSpaces === 0) {
            isStartOfString = false;
        }
        
        //  If the next character is not a space:
        // we have to find out if it is end or start of string, then we delete all spaces
        // or somewhere in string between characters, then we leave one space
        if (input[offset + 1] !== ' ') {
            //  If it's the start of string
            if (isStartOfString === true) {
                isStartOfString = false;
                counterOfSpaces++;
                return '';
            }

            //  If it's the end of string
            if (input[offset + 1] === undefined) {
                counterOfSpaces++;
                return '';
            }

            //  If it's exactly not start or end of string(between characters)
            return ' ';
        }

        counterOfSpaces++;
        //  If next character is space we just delete it
        return '';
    });

    return string;
}