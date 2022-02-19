module.exports = {
  generateArray: (level) => {
    var arr = [];

    if (level == 1 || level == 2 || level == 3) {
      while (arr.length < 10) {
        var r = Math.floor(Math.random() * 20) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
      }
    } else if (level == 4) {
      while (arr.length < 20) {
        var r = Math.floor(Math.random() * 50) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
      }
    } else if (level == 5) {
      while (arr.length < 50) {
        var r = Math.floor(Math.random() * 100) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
      }
    }
    return arr;
  },

  splitArray: (array, isBlank) => {
    if (array.length < 2) return [array];

    let left = array.slice(0, array.length / 2 + 0.5);
    let right = array.slice(array.length / 2 + 0.5, array.length);

    //return merge(splitArray(left), splitArray(array))
    return isBlank
      ? [left.map((l) => null), right.map((r) => null)]
      : [left, right];
  },

  merge: (l, r, isBlank) => {
    let array = new Array();
    let indexL = 0;
    let indexR = 0;
    let i = 0;
    let j = 0;
    let arr;
    let ar = new Array();

    while (true) {
      if (l[i] === undefined) {
        arr = "left";
        break;
      } else if (r[j] === undefined) {
        arr = "right";
        break;
      }

      if (l[i] < r[j]) {
        array.push(l[i]);
        i++;
        indexL = i;
      } else {
        array.push(r[j]);
        j++;
        indexR = j;
      }
    }

    if (arr == "left") {
      if (indexR == 0) ar = sort(r);
      else ar = sort(r.slice(indexR));
    } else {
      if (indexL == 0) ar = sort(l);
      else ar = sort(l.slice(indexL));
    }

    array.push(isBlank ? ar.map((a) => null) : ar);
    return [...array.flat()];
  },
};

function sort(array) {
  var done = false;
  while (!done) {
    done = true;
    for (let i = 1; i < array.length; i++) {
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
