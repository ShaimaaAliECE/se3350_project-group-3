
module.exports = {
    generateArray: (length, max) => {
    let array = new Array(length);
    
    for(let i=0; i<length; i++)
        array[i] = Math.floor(Math.random() * max);
  
    return array
    },


    splitArray: (array) => {

    if(array.length<2)
        return [array]

   let left = array.slice(0, array.length/2+.5)
   let right = array.slice(array.length/2+.5, array.length)
        
        //return merge(splitArray(left), splitArray(array))
       return [left, right]
    
    
},

    merge: (l, r) => {
    let array = new Array()
    let indexL = 0
    let indexR = 0
    let i=0;
    let j=0;
    let arr;
    let ar = new Array();

    while(true){
        if(l[i] === undefined){
            arr = "left"
            break;
        }else if (r[j]=== undefined){
            arr = "right"
            break;
        }

        if (l[i] < r[j]) {
            array.push(l[i]) 
            i++
            indexL = i;
        } else {
            array.push(r[j]) 
            j++
            indexR = j;
        }
    }

    if(arr=="left"){
        if(indexR == 0)
            ar = sort(r)
           
        else
            ar = sort(r.slice(indexR))
    }else{
        if(indexL == 0)
            ar = sort(l)
        else
            ar = sort(l.slice(indexL))  
    }

    array.push(ar)
    return [...array.flat()]
}

}

function sort(array) {
    var done = false;
    while (!done) {
      done = true;
      for (let i = 1; i < array.length; i ++) {
        if (array[i - 1] > array[i]) {
          done = false;
          var tmp = array[i - 1];
          array[i - 1] = array[i];
          array[i] = tmp;
        }
      }
    }
  
    return array;
  }

