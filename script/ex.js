let arr = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5]
];
let col = [];

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
      console.log(arr[i][i])
    arr[j][i] = arr[i][i]
  
  }
}
console.log(arr)