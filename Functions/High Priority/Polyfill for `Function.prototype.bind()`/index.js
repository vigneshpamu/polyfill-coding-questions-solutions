if (!Function.prototype.myBind) {
  Function.prototype.myBind = function (context, ...bindArgs) {
    if (typeof this !== 'function') {
      throw new TypeError(
        'Function.prototype.bind - what is trying to be bound is not callable'
      )
    }

    const originalFn = this

    function boundFunction(...callArgs) {
      // Handle constructor calls with 'new'
      const isNew = this instanceof boundFunction
      const finalContext = isNew ? this : context

      console.log(this)

      return originalFn.apply(finalContext, [...bindArgs, ...callArgs])
    }

    // Set prototype chain correctly when used as a constructor
    boundFunction.prototype = Object.create(originalFn.prototype)

    return boundFunction
  }
}

// ✅ Example 1: Simple Binding

let obj = {
  name: 'Jack',
}

let greet = function (id, location) {
  console.log(`${this.name}, ID: ${id}, Location: ${location}`)
}

let boundGreet = greet.myBind(obj, 'A123') // 'A123' is bind-time arg
boundGreet('Mumbai') // call-time arg

function Person(name) {
  this.name = name
}

console.log(`-----------------------------------------------`)

// Example 2: Constructor Behavior (new keyword)
let user = {
  role: 'manager',
}

// Bind the Person function to obj and preset one arg
const BoundPerson = Person.myBind(user)

const p1 = new BoundPerson('Vignesh')

console.log(p1.name) // Vignesh
console.log(p1 instanceof Person) // true
console.log(p1 instanceof BoundPerson) // true

// Reference - https://chatgpt.com/share/686823a8-fa7c-8004-ac9a-796e47f7085f
