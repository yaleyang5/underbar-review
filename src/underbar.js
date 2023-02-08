(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    //return the thing
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    // we got a little cutesy here, but I think it was a good way to test our mastery
    n = n === 0 ? -array.length : n;
    // use a ternary
    return n === undefined ? array[array.length-1] : array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // I: collection, either an arr or a dict, and iterator, a function
    // O: none
    // E: empty stuff, possibly bad inputs or no iterator

    // check if array
    if (Array.isArray(collection)) {
      // array case
      // iterate through the array
      for (let i = 0; i < collection.length; i++){
        // call iterator(value, key, collection)
        iterator(collection[i], i, collection);
      }
    }
    // check if object
    else if (typeof collection === 'object'){
      // object case
      // iterate through the object
      for (let key in collection){
        // call iterator(value, key, collection)
        iterator(collection[key], key, collection);
      }
    }

    // should do nothing if neither array or object
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // make a return array
    var resultArray = [];
    // each
    _.each(collection, function(item) {
      // if it passes a test
      if (test(item)) {
        // push to array
        resultArray.push(item);
      }
    });

    // return the array
    return resultArray;

  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    // I: same as filter
    // O: the opposite of filter

    // this can just filter by a test that is the opposite test
    return _.filter(collection,  function(item) {
      return !(test(item));
    })
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    //I: array
    //O: that array, minus dupes
    //E: nah

    // note to self: the iterator function is the check for the unique quality we care about
    // so we need a seen array, that stores the reults of each try of the iteraor if we have one
    // create a result array
    var resultArray = [];
    var seenArray = [];

    //if we have an iterator, use it. Otherwise, use identity
    iterator = iterator ? iterator : _.identity;

    // iterate through the array
    _.each(array, function(element) {
      // check if the element isn't in the result array
      if (!(seenArray.includes(iterator(element)))) {
        // add element into result
        resultArray.push(element);
        // add iterated into seen
        seenArray.push(iterator(element));
      }
    });
    // return the result
    return resultArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    // I: a collection, either a obj or an arr
    //    iterator, a function
    // O: an array of results of applying iterator to the collection
    // C: not really
    // E: possibly some sort of broken arrays or objects

    // create a storage array
    let returnArray = []

    // call each with a function
    _.each(collection, function(item) {
      // (we are in the function definition here)
      // push the result of iterator(this object in the collection) into storage array
      returnArray.push(iterator(item));
    });
    // return storage array
    return returnArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // i: Collection: either an array or an object
    //    iterator: the function to call on accumulator and this element of the collection
    //    accumulator: storage variable that contains the return of the previous iterator. Fall back is the 1st elemenet
    // o: one value, the final accumulator
    // c: nothing big
    // e: empty arrays and dicts, no accumulator

    // if no accumulator, set accumulator to first element in collection, and do something to make sure you start with second element
    if (accumulator === undefined) {
      accumulator = collection[0];
      collection = collection.slice(1);
    }

    // call each of the collection with a function that takes in (item)
    _.each(collection, function(item) {
      // (we are in that function now)
      // set accumulator equal to iterator(accumulator, item)
      accumulator = iterator(accumulator, item);
    });
    // return accumulator
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    // I: collection, iterator (logical test => true/false)
    // O: boolean (or truthy/falsy expression)
    // C: try to use reduce!
    // E: TBD

    //if we have an iterator, use it. Otherwise, use identity
    iterator = iterator ? iterator : _.identity;

    // return a reduce function, passing in collection &
    // a function we'll define
    return _.reduce(collection, function(noFalseYet, item) {
      // (in function definition)
      // if no element has been false yet and current iterated item is true
      if (noFalseYet && iterator(item)) {
        // return true
        return true;
      } else {
        // return false
        return false;
      }
    }, true);

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    // I: collection, boolean logic function
    // O: typeof MUST be boolean
    // C: try to use every()
    // E: empty collection, no iterator (provide default -
    //    or every might do it for us)

    // overall logic: if not all birds are not blue, then some are blue.

    // if iterator is undefined, use identity
    iterator = iterator ? iterator : _.identity;

    // return an every function, passing in our collection and a function that takes in each element
    return !_.every(collection, function(item) {
      // (in function def)
      // return 'not' iterator on item
      return !iterator(item);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // I: 1 object, and arguments.length - 1 number of objects to be appended
    // O: first object appended with key-value pairs of all other objects
    // C: TBD
    // E: 0 or 1 objects as arguments

    // iterate through the arguments 'array' starting from index 1
    for (var i = 1; i < arguments.length; i++) {
      // iterate through keys of object
      for (var key in arguments[i]) {
        // put the current key-value pair in obj
        obj[key] = arguments[i][key];
      }
    }
    // return first argument
    return obj;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    // I: 1 object, and arguments.length - 1 number of objects to be appended
    // O: first object appended with key-value pairs of all other objects
    // C: TBD
    // E: 0 or 1 objects as arguments

    // iterate through the arguments 'array' starting from index 1
    for (var i = 1; i < arguments.length; i++) {
      // iterate through keys of object
      for (var key in arguments[i]) {
        // put the current key-value pair in obj
        if (obj[key] === undefined) {
          obj[key] = arguments[i][key];
        }
      }
    }
    // return first argument
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // I: function
    // O: version of the function that will only run once for a given set of inputs
    // C: none
    // E: don't have to worry about non-primitive arguments

    // create a storage array to keep track of arguments done before
    // create a storage array to keep track of outputs done before
    // ^indices are the same

    // return a function
      // (inside function def)
      //



  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
