if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (callback, thisArgs) {
    if (this === null) {
      throw new TypeError('Array.prototype.map called on null or undefined')
    }

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function')
    }
    console.log('This is this ', this)

    const O = Object(this)

    console.log('This is O ', O)

    const len = O.length >>> 0
    const result = new Array(len)

    for (let i = 0; i < len; i++) {
      if (i in O) {
        result[i] = callback.call(thisArgs, O[i], i, 0)
      }
    }

    return result
  }
}

const arr = [1, 2, , 4, 5]
const arr2 = [, , , ,]
const finalArr = arr.myMap((item) => item * 2)

console.log(finalArr)

// Reference Doc - https://chatgpt.com/share/686d5359-1284-8004-9035-258327ae14f5
