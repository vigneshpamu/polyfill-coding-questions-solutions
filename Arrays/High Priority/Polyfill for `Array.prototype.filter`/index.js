if (!Array.prototype.myFilter) {
  /**
   * Creates a new array with all elements that pass the test implemented by the provided callback.
   * @param {Function} callback - Function to test each element. Return `true` to keep the element.
   * @param {*} [thisArg] - Value to use as `this` when executing callback.
   * @returns {Array} New array with elements that pass the test.
   */
  Array.prototype.myFilter = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError('Array.prototype.filter called on null or undefined')
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function')
    }

    const result = []
    const O = Object(this)
    const len = O.length >>> 0

    for (let i = 0; i < len; i++) {
      if (i in O) {
        const element = O[i]
        if (callback.call(thisArg, element, i, O)) {
          result.push(element)
        }
      }
    }

    return result
  }
}
const arr = [1, 2, , 4, 5]
const arr2 = [, , , ,]
const finalArr = arr.myFilter((item) => item > 2)

console.log(finalArr)

// Reference Doc - https://chatgpt.com/share/686d5497-26e8-8004-8674-027169aa53b1
