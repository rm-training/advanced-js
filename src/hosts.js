/*
 * Hosts Exercise:
 *
 * Using an IIFE, change the `Hosts' variable below so that it becomes
 * an object.  The object should have four (4) properties that are all
 * functions:
 *
 *   add(name, address) - A function that takes two arguments, a host
 *                        name and an IP address.  The function should
 *                        record that the given host has the specified
 *                        IP address.
 *
 *  lookupByName(name)  - A function that returns all IP addresses
 *                        associated with the given host name.  If the
 *                        given name has not been recorded by a call
 *                        to `add' then this function should return an
 *                        empty array.
 *
 *  lookupByIP(address) - A function that returns all host names that
 *                        were recorded with the specified IP address.
 *                        If the specified IP address does not have
 *                        any host names associated with it then this
 *                        function should return an empty array.
 *
 *  clear()             - A function that removes all host names and
 *                        IP addresses from the Hosts object.
 *
 * Notes:
 *
 *  - Do not introduce any new global variables.  The `Hosts` variable
 *    is the only allowed global variable.
 *
 *  - Run the tests using the following command:
 *
 *        node bin/jasmine spec/hosts.spec.js
 *
 *  - Look at the spec file for clarification of the requirements
 *    listed above.  The spec file is: spec/hosts.spec.js
 *
 *
 * Bonus Exercise:
 *
 * When your tests are passing, try adding the following
 * functionality:
 *
 * Using the `Object.defineProperty' function, add a new property to
 * the API called `length'.  The `length' property should be dynamic
 * and should equal the total number of entries stored in the `Hosts'
 * object.  This property SHOULD NOT be a function, and it must be
 * enumerable.  (Hint: look at the `get' property descriptor.)
 *
 * For example, if the `Hosts' object has three (3) host names and
 * five (5) IP addresses then the `length' property should be eight
 * (8).
 *
 * Make sure your tests still pass.
 */
Hosts = (function() {
  var cache = {};

  var add = function(name, addresses) {
    if (!cache.hasOwnProperty(name) ||
        cache[name] === undefined)
    {
      cache[name] = [];
    }

    cache[name].push(addresses);
  };

  var lookupByName = function(name) {
    return cache[name] || [];
  };

  var lookupByIP = function(ip) {
    var names = [];

    for (var p in cache) {
      if (!cache.hasOwnProperty(p)) continue;
      var i = cache[p].indexOf(ip);
      if (i >= 0) names.push(p);
    }

    return names;
  };

  var clear = function() {
    for (var p in cache) {
      if (cache.hasOwnProperty(p)) delete cache[p];
    }
  };

  var api = {
    add:          add,
    lookupByName: lookupByName,
    lookupByIP:   lookupByIP,
    clear:        clear,
  };

  Object.defineProperty(api, "length", {
    enumerable: true,

    get: function() {
      var slots = Object.keys(cache);

      return slots.reduce(function(acc, slot) {
        return acc + cache[slot].length;
      }, slots.length);
    },
  });

  // Expose our public API:
  return api;
})();
