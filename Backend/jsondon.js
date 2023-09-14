let arr = ["",11,12,13,14,15,12,12,43,21,43,24,2,34,12,12,12]
maxNumber = Math.max(...arr)
console.log(maxNumber)
let numbers = arr.filter((self,a)=>{
   return arr.indexOf(self) === a
})
let numbers2 = arr.map((a)=>{
    return a * 3
})
console.log(numbers)
console.log(numbers2)
function finding(arr,x) {
    let arr2 = 0
    for(let i =0;i<arr.length;i++){
        if(arr[i] == x){
         return x
        } 
    }
    return arr2
}

let answer = finding(arr,12)
console.log(answer)

let arnold = () => {
    return "Arnold"
}

console.log(arnold())