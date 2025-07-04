if (!Function.prototype.debounce) {
  /**
   * Creates a debounced version of the original function.
   * @param {number} wait - Time in milliseconds to delay.
   * @param {boolean} immediate - If true, triggers on the leading edge.
   * @returns {Function} Debounced version of the original function.
   */
  Function.prototype.debounce = function (wait = 300, immediate = false) {
    if (typeof this !== 'function') {
      throw new TypeError(
        'Function.prototype.debounce must be called on a function'
      )
    }

    const originalFn = this
    let timeoutId

    return function (...args) {
      const context = this

      const later = () => {
        timeoutId = null
        if (!immediate) {
          originalFn.apply(context, args)
        }
      }

      const callNow = immediate && !timeoutId

      clearTimeout(timeoutId)
      timeoutId = setTimeout(later, wait)

      if (callNow) {
        originalFn.apply(context, args)
      }
    }
  }
}

function expensiveOperation(x, y) {
  console.log('Expensive computation with:', x, y)
}

const safeFn = expensiveOperation.debounce(400)

// Simulate rapid calls
safeFn(1, 2)
safeFn(3, 4)
safeFn(5, 6) // Only this call will be executed after the debounce window

// Reference - https://chatgpt.com/share/68682447-8794-8004-9b4b-90408eacf0b2
