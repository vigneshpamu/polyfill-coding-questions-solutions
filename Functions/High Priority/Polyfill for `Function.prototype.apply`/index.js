if (!Function.prototype.myApply) {
  Function.prototype.myApply = function (context, argsArray) {
    // Step 1: Ensure the function is callable
    if (typeof this !== 'function') {
      throw new TypeError(this + ' is not a function')
    }

    // Step 2: Fallback to global object if context is null or undefined
    context = context ?? globalThis

    // Step 3: Convert context to object (in case it's a primitive)
    context = Object(context)

    // Step 4: Create a unique property on the context to avoid collision
    const fnSymbol = Symbol()
    context[fnSymbol] = this

    // Step 5: Call the function using the context with the provided args
    let result
    if (argsArray == null) {
      result = context[fnSymbol]()
    } else {
      if (!Array.isArray(argsArray) && typeof argsArray !== 'object') {
        throw new TypeError('CreateListFromArrayLike called on non-object')
      }
      result = context[fnSymbol](...argsArray)
    }

    // Step 6: Cleanup
    delete context[fnSymbol]

    return result
  }
}

function greet(greeting) {
  return `Hi, ${greeting} this is ${this.name}`
}

const user = { name: 'Vignesh' }

console.log(greet.myApply(user, ['Good Morning']))

// Reference - https://chatgpt.com/share/68682372-7ab0-8004-83a2-fbb40ed6dffa
