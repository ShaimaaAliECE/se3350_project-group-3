function quickSort(array){
    if(array.length <= 1){
      return array;
    }
  
    const pivot = array[array.length-1];
    const l = [];
    const g = [];
  
    for(let i=0; i < array.length-1;i++){
      if(array[i] < pivot){
        l.push(array[i]);
      }
      else{
        g.push(array[i])
      }
    }
  
    return [...quickSort(l) ,pivot,...quickSort(g)];
  
  }

  console.log(quickSort([1,5,8,77,4,2,55,6]));