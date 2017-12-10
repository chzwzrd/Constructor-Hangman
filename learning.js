// REGEX
var str = 'reindeer';
var regex = /e/gi;
var letter = str.match(regex);
// while ((match = regex.exec(str)) != null) {
//     console.log("match found at " + match.index);
// }
var arr = str.split('');
var indices = [];
for (var i = 0; i < arr.length; i++) {
    if (arr[i] === 'e') {
        indices.push(i);
    }
}
console.log(indices);

for (var i = 0; i < indices.length; i++) {
    str = str.replace(str[indices[i]], '_');
}
console.log(str);

// var str = 'For more information, see Chapter 3.4.5.1';
// var re = /see (chapter \d+(\.\d)*)/i;
// var found = str.match(re);
// console.log(found);

console.log('e'.match(/[a-z]/i).length > 0);