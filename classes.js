/**
 * Classes are a template for creating objects.
 * A class element can be characterized by three aspects:
 *      Kind: Getter, setter, method, or field
 *      Location: Static or instance
 *      Visibility: Public or private
 * 
 * The body of a class is executed in strict mode even without the 
 * "use strict" directive.
 * 
 * tatic properties (fields and methods) are defined on the class 
 * itself instead of each instance.
 */

/**
 * So isNaN just checks whether the passed value is not a number or 
 * cannot be converted into a Number. Number.isNaN on the other 
 * hand only checks if the value 
 * is equal to NaN (it uses a different algorithm than === though).
 * 
 *  Number.isNaN({});
    // <- false, {} is not NaN
    Number.isNaN('ponyfoo')
    // <- false, 'ponyfoo' is not NaN
    Number.isNaN(NaN)
    // <- true, NaN is NaN
    Number.isNaN('pony'/'foo')
    // <- true, 'pony'/'foo' is NaN, NaN is NaN

    isNaN({});
    // <- true, {} is not a number
    isNaN('ponyfoo')
    // <- true, 'ponyfoo' is not a number
    isNaN(NaN)
    // <- true, NaN is not a number
    isNaN('pony'/'foo')
    // <- true, 'pony'/'foo' is NaN, NaN is not a number
 */

// this represents the object that the function is a property of.

console.log(typeof undefined) -> undefined
console.log(typeof null) -> object

/**
 * map passes three arguments into parseInt() on each iteration. 
 * The second 
 * argument index is passed into parseInt as a radix parameter. 
 */

[1, 2, 3, 4, 5].map(console.log); 
[1, 2, 3, 4, 5].map(
    (val, index, array) => console.log(val, index, array)
);