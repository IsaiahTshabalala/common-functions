# JavaScript Object Utilities & Field Validation Functions

Common functions used for working with JavaScript objects and validating field values.

---

## 1. JavaScript Object Utilities

### `getPaths(anObject)`
Returns a string array of path/field names inside a JavaScript object.
** Example **
let client = {
    name: "Jack",
    surname: "Stober",
    address: {
        streetNum: "57",
        streetName: "Tiger Drive",
        suburb: "Lakeside Ext.1",
        town: "Lakeside",
        country {
            name: "South Africa",
            code: "za"
        }
    }
};

let paths = getPaths(client);
// ["name", "surname", "address.streetNum", "address.streetName", "address.suburb",
//  "address.town", "address.country.name", "address.country.code"]

### `hasOnly(anObject, ...fields)`
Returns `true` if the object contains **only** some or all of the specified fields and no others.
** Examples **
const { hasOnly } = require("some-common-functions-js");

let car = {
    make: "Ford",
    model: "Ranger",
    year: "2015",
};

let result = hasOnly(car, ["make", "model", "year"]);
// true, because car has *only all of the specified fields and no other fields.

result = hasOnly(car, ["make", "model", "year", "maxSpeed", "gvm"]);
// true, because car has *only some of the specified fields and no other fields.

result = hasOnly(car, ["maxSpeed", "gvm", "power"]);
// false, because car has fields other than the specified fields.

result = hasOnly(car, ["make", "model"]);
// false, because car has fields other than the specified fields.

### `hasAll(anObject, ...fields)`
Returns `true` if the object contains **all** the specified fields.  
The object may contain additional fields.
** Examples **
const { hasAll } = require("some-common-functions-js");

let car = {
    make: "Ford",
    model: "Ranger",
    year: "2015",
    power: "1000kW",
    type: "pickup truck"
};

let result = hasAll(car, ["make", "model"]);
// true, because car has all the specified fields.

let result = hasAll(car, ["passengerCapacity", "year"]);
// false, because car does not have "passengerCapacity" field.
---

## 2. Field Validation Functions

### `isValidUserName(userName)`
Returns `true` if a username is valid.

### `isValidName(name)`
Returns `true` if a personal name is valid.

### `isValidEmail(email)`
Returns `true` if an email address is valid.

### `isValidPhoneNum(num)`
Returns `true` if a phone number is valid.

### `isValidOrganisationName(name)`
Returns `true` if an organisation name is valid.

### `isValidPassword(password)`
Returns `true` if the password meets the required strength rules.

---

## License
MIT