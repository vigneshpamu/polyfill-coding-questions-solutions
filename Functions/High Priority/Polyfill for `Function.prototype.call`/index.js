if (!Function.prototype.myCall2) {
  Function.prototype.myCall2 = function (context, ...args) {
    context = context ?? globalThis

    context = Object(context)

    const uniqueId = Symbol()

    context[uniqueId] = this

    const result = context[uniqueId](...args)

    delete context[uniqueId]

    return result
  }
}

const greet = (greeting, punctuation) => {
  return `${greeting}, ${this.name}${punctuation}`
}

const user = { name: 'Vignesh' }
console.log(greet.myCall2(user, 'Hello', '!')) // Hello, Vignesh!

// Reference - https://chatgpt.com/share/68681467-fa70-8004-8679-47554a5b8ab0
