
module.exports = {
    generateArray: (length, max) => {
    let array = new Array(length);
    
    for(let i=0; i<length; i++)
        array[i] = Math.floor(Math.random() * max);
  
    return array
    },

    splitArray: (array) => {
    
    
    
    if(array.length<2)
        return array
   
   let left = array.splice(0, array.length/2+.5)
        console.log(left)
        console.log(array)
        return merge(splitArray(left), splitArray(array))
    
},


    merge: (l, r) => {
    let array = new Array()
    
    while (l.length && r.length) {
       
        if (l[0] < r[0]) {
            array.push(l.shift())  
        } else {
            array.push(r.shift()) 
        }
    }
    
    return [...array, ...l, ...r]
}

}

