if (!Function.prototype.throttle) {
  /**
   * Creates a throttled version of the original function.
   * The function will execute at most once every `wait` ms.
   *
   * @param {number} wait - Time interval in milliseconds to throttle executions.
   * @param {Object} options - Configuration object.
   * @param {boolean} [options.leading=true] - Trigger on the leading edge.
   * @param {boolean} [options.trailing=true] - Trigger on the trailing edge.
   * @returns {Function} - Throttled function.
   */
  Function.prototype.throttle = function (wait, options = {}) {
    if (typeof this !== 'function') {
      throw new TypeError('Throttle must be called on a function')
    }

    let timerId = null
    let lastArgs = null
    let lastThis = null
    let lastCallTime = 0
    const fn = this

    const { leading = true, trailing = true } = options

    const invoke = (time) => {
      lastCallTime = time
      fn.apply(lastThis, lastArgs)
      lastThis = lastArgs = null
    }

    const throttled = function (...args) {
      const now = Date.now()

      // First call or enough time has passed
      if (lastCallTime === 0 && !leading) {
        lastCallTime = now
      }

      const remaining = wait - (now - lastCallTime)
      lastThis = this
      lastArgs = args

      if (remaining <= 0 || remaining > wait) {
        if (timerId) {
          clearTimeout(timerId)
          timerId = null
        }
        invoke(now)
      } else if (trailing && !timerId) {
        timerId = setTimeout(() => {
          timerId = null
          if (trailing && lastArgs) {
            invoke(Date.now())
          }
        }, remaining)
      }
    }

    throttled.cancel = function () {
      clearTimeout(timerId)
      timerId = null
      lastCallTime = 0
      lastArgs = lastThis = null
    }

    return throttled
  }
}

function logScroll() {
  console.log('Scroll event at', new Date().toISOString())
}

const throttledScroll = logScroll.throttle(2000, {
  leading: true,
  trailing: true,
})

window.addEventListener('scroll', throttledScroll)

// Optional: cancel the throttling
// throttledScroll.cancel();
