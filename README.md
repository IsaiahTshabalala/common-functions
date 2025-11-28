# JavaScript Object Utilities & Field Validation Functions

Common functions used for working with JavaScript objects and validating field values.

---
## Installation
**npm install some-common-functions-js**

## 1. JavaScript Object Utilities

### `getPaths(anObject)`
Returns a string array of path/field names inside a JavaScript object.  
***Example***  
```
const { getPaths } = require("some-common-functions-js");  
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
```
### `hasOnly(anObject, ...fields)`
Returns `true` if the object contains **only** some or all of the specified fields and no others.  
***Examples***  
```
const { hasOnly } = require("some-common-functions-js");  

let car = {  
    make: "Ford",  
    model: "Ranger",  
    year: "2015",  
};  
let result = hasOnly(car, "make", "model", "year");  
// true, because car has *only all of the specified fields and no other fields.  

result = hasOnly(car, "make", "model", "year", "maxSpeed", "gvm");  
// true, because car has *only some of the specified fields and no other fields.  

result = hasOnly(car, "maxSpeed", "gvm", "power");  
// false, because car has fields other than the specified fields.  

result = hasOnly(car, "make", "model");  
// false, because car has fields other than the specified fields.  
```
### `hasAll(anObject, ...fields)`
Returns `true` if the object contains **all** the specified fields.  
The object may contain additional fields.  
***Examples***  
```
const { hasAll } = require("some-common-functions-js");  
let car = {  
    make: "Ford",  
    model: "Ranger",  
    year: "2015",  
    power: "1000kW",  
    type: "pickup truck"  
};  
let result = hasAll(car, "make", "model");  
// true, because car has all the specified fields.  

let result = hasAll(car, "passengerCapacity", "year");  
// false, because car does not have "passengerCapacity" field.  
```
### `hasOnlyAll(anObject, ...fields)`
Return `true` if an object contains only all the specified fields, nothing more, nothing less
***Example***
```
const { hasOnlyAll } = require("some-common-functions-js");  
let car = {  
    make: "Ford",  
    model: "Ranger",  
    year: "2015",  
    power: "1000kW",  
    type: "pickup truck"  
};  
let result = hasOnlyAll(car, "make", "model");  
// false, because car has all the specified fields and extra fields.  

let result = hasOnlyAll(car, "passengerCapacity", "year");  
// false, because car does not have "passengerCapacity" field.  

let result = hasOnlyAll(car, "make", "model", "power", "type");  
// true, because car has all the specified fields, nothing less, nothing more.  

```
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

## 3. Comparison and Binary Search functions for primitive types and javascript objects

### `compare(value1, value2, sortDir = 'asc')`
Compares two values of the same primitive type, according to the sort direction.  
* A return value of -1 means that value1 is before value2 in terms of sort order.
* A return value of 1 means that value1 is after value2 in terms of sort order.
* A return value of 0 means that value1 is equal to value2.
* Sort directions: 'asc', 'desc'. Default is 'asc'.

***Examples***  
```
const { compare } = require("some-common-functions-js");  

let x = "Jiāng Fāng";  
let y = "Isaiah Tshabalala";  
let result = compare(x, y);  // -1 because "Jiāng Fāng" is before "Isaiah Tshabalala" in ascending order.  
result = compare(y, x);  
console.log(result); // 1 because "Isaiah Tshabalala" is after "Jiāng Fāng" in ascending order.  
result = compare(x, y, 'desc');  
console.log(result); // 1 because "Jiāng Fāng" is after "Isaiah Tshabalala" in descending order.
```
### `binarySearch(anArray, searchVal, startFrom = 0, arraySortDir = 'asc')`
Binary Searches a sorted primitive type array for a value and returns the index.  
* ArraySortDir specifies the direction in which the array is sorted (desc or asc).
* If the array contains the value searched for, then the index returned is the location of this value on the array,
* otherwise, the index is of closest value in the array that is before or after the search value in terms of sort order.
* The programmer must write equality-check code to determine if the array element at the returned index is indeed the sought element.
* Value of -1 is returned for an empty array.
* This function is to be used also in cases where values are to be inserted into the array while maintaining sort order.
* Sort directions: 'asc', 'desc'. Default is 'asc'.

 ***Example***  
 ```
 const { binarySearch, compare } = require("some-common-functions-js");  
 let myArray = [100, 101, 102, 103, 104, 105, 106, 107];  
 let index = binarySearch(myArray, 103); // 3  
 let result = compare(103, myArray[index]); // 0, 103 === myArray[index].  
 index = binarySearch(myArray, 103, 4); // 4  
 result = compare(103, myArray[4]); // -1 meaning 103 is less than (before) myArray[4]
```
### `objCompare(obj1, obj2, ...comparisonFields)`
Compare 2 objects according to the comparison fields specified in the comparison fields, and return the result.
* Each each of the comparisonFields must be of the form 'fieldName sortDirection' or 'fieldName'. 
* Sort directions: 'asc', 'desc'. Default: 'asc'.
* Examples: 'lastName desc', 'firstName', 'firstName asc', 'address.provinceName asc'.
* If sort direction is not provided, then it is assumed to be ascending.

***Example***  
```
const { objCompare } = require('some-common-functions-js');
let anObject = {  
    firstName: "Isaiah",  
    lastName: "Tshabalala",  
    address: {  
        houseNum: "23-B",  
        streetName: "Main Road",  
        mainPlace: "Lakeside",  
        subPlace: "Lakeside Ext.1",  
        city: "Johannesburg",  
        country: {  
            name: "South Africa",  
            code: "ZA"  
        }  
    }  
};  
let anObject2 = {  
    firstName: "Lindiwe",  
    lastName: "Tshabalala",  
    address: {  
        houseNum: "5520",  
        streetName: "Main Road",  
        mainPlace: "Evaton",  
        subPlace: "Evaton Small Farms",  
        city: "Vereeniging",  
        country: {  
            name: "South Africa",  
            code: "ZA"  
        }  
    }  
};  
let result = objCompare(anObject, anObject2, "lastName", "firstName");  
// -1 because "Tshabalala Isaiah" is before "Tshabalala Lindiwe" according to ascending order.  

result objCompare(anObject, anObject2, "address.country.name", "address.city desc");  
// 1 because same country (0), but "Johannesburg" is after "Vereeniging" according to descending order.  

let anObject3 = {  
    firstName: "Huang",  
    lastName: "Shi",  
    address: {  
        houseNum: "5520",  
        streetName: "Yuan Road",  
        mainPlace: "Qīngyún Chéng",  
        subPlace: "Phase 1",  
        city: "Dragon City",  
        country: {  
            name: "China",  
            code: "CN"  
        }  
    }  
};  
let objArray = [anObject2, anObject, anObject3];  
// Using objCompare to sort objects in objArray using multiple fields including nested fields.  
objArray.sort((obj1, obj2)=> {  
                    return objCompare(  
                        obj1, obj2,  
                        "address.country.name",  
                        "address.city",  
                        "adress.mainPlace",  
                        "address.subPlace",  
                        "lastName",  
                        "firstName"  
                    );  
                });  
console.log(objArray);   
/*  
    [  
        {  
            firstName: 'Huang',  
            lastName: 'Shi',  
            address: {  
                houseNum: '5520',  
                streetName: 'Yuan Road',  
                mainPlace: 'Qīngyún Chéng',  
                subPlace: 'Phase 1',  
                city: 'Dragon City',  
                country: {  
                    name: "China",  
                    code: "CN"  
                }  
            }  
        },  
        {  
            firstName: 'Albertina',  
            lastName: 'Tshabalala',  
            address: {  
                houseNum: '5520',  
                streetName: 'Main Road',  
                mainPlace: 'Evaton',  
                subPlace: 'Evaton Small Farms',  
                city: 'Vereeniging',  
                country: {  
                    name: "South Africa",  
                    code: "ZA"  
                }  
            }  
        },  
        {  
            firstName: 'Isaiah',  
            lastName: 'Tshabalala',  
            address: {  
                houseNum: '5520',  
                streetName: 'Main Road',  
                mainPlace: 'Evaton',  
                subPlace: 'Evaton Small Farms',  
                city: 'Vereeniging',  
                country: {  
                    name: "South Africa",  
                    code: "ZA"  
                }  
            }  
        }  
    ]  
*/  
let teams = [  
    {  
        score: 85,  
        numGames: 10  
    },  
    {  
        score: 90,  
        numGames: 12  
    },  
    {  
        score: 85,  
        numGames: 8  
    },  
    {  
        score: 90,  
        numGames: 10  
    }  
];  
// Using objCompare to sort fields where there are mixed sort directions.  
// Sort by score descending, then by numGames ascending.  
teams.sort((team1, team2) => {  
    return objCompare(  
                team1, team2,  
                "score desc",  
                "numGames asc"  
            );  
});  
console.log(teams);  
/*  
    [  
        { score: 90, numGames: 10 },  
        { score: 90, numGames: 12 },  
        { score: 85, numGames: 8 },  
        { score: 85, numGames: 10 }  
    ]  
*/  
```
### `binarySearchObj(objArray, searchObj, startFrom, ...sortFields)`
Binary Search the sorted (ascending or descending order) array of objects for a value and return the index.  
* The assumption is that the array is sorted in order of 1 or more sort fields,
* for example 'lastName asc', 'firstName', 'address.province asc', 'address.townOrCity asc'.
* If sort direction is not provided, then it is assumed to be 'asc' (ascending).
* If the array contains the object with values searched for, then the index returned is the location of this value in the array,
* otherwise, the index is of the closest value in the array that is before or after the searchObj value.
* Return -1 for an empty array.
* Assumed field data types are Number, String and Date.
* This function is to be used also in cases where objects are to be inserted into the array while maintaining sort order.

***Example***  
```
const { objCompare, binarySearchObj } = require("some-common-functions-js");
let teamsArray = [  
    { score: 90, numGames: 10 },  
    { score: 90, numGames: 12 },  
    { score: 85, numGames: 8 },  
    { score: 85, numGames: 10 }  
]; // Sorted by "score desc", "numGames asc".  
let searchObj = { score: 85, numGames: 8 };  
let anIndex = binarySearchObj(teamsArray, searchObj, 0, "score desc", "numGames asc");

let result = objCompare(searchObj, teamsArray[anIndex], "score desc", "numGames asc"); // 0 -- an object with value { score: 85, numGames: 8} exists at teamsArray[anIndex];   
```
## 4. `getObjArrayWithNoDuplicates(objArray, firstOfDuplicates, ...comparisonFields)`
Create an array of objects with duplicates eliminated. Taking only the first or last object from each duplicate set. The input array must be sorted according to the values of comparisonFields.  
 * If firstOfDuplicates === true, then the first element in each set of duplicates is taken.  
 * if firstOfDuplicates === false, then the last element is taken from each set of duplicates.  
 * Assumed field data types are Number, String and Date.  
 * The array must be sorted according to the comparison fields before calling this function.  
 * The value of the comparison field must include both the field name and sort direction.  
 * Sort direction assumed to be "asc" if not provided.  
 * Examples of comparison fields: "firstName", "lastName desc", "address.province asc", "address.townOrCity".  

***Example***  
```
const { getObjArrayWithNoDuplicates } = require("some-common-functions-js");  
let teamsArray = [  
    { score: 90, numGames: 10 },  
    { score: 90, numGames: 10 },  
    { score: 90, numGames: 10 },  
    { score: 90, numGames: 12 },  
    { score: 90, numGames: 12 },  
    { score: 90, numGames: 12 },  
    { score: 85, numGames: 8 },  
    { score: 85, numGames: 8 },  
    { score: 85, numGames: 10 },  
    { score: 85, numGames: 10 },  
    { score: 85, numGames: 10 }  
]; // Sorted by "score desc", "numGames asc".  

let noDuplicatesArray = getObjArrayWithNoDuplicates(teamsArray, true, "score desc", "numGames asc");  
console.log(noDuplicatesArray); // Should contain only unique objects according to comparison fields.  
/*  
    [  
        { score: 90, numGames: 10 },  
        { score: 90, numGames: 12 },  
        { score: 85, numGames: 8 },  
        { score: 85, numGames: 10 }  
    ]  
*/  
```
---
## License
MIT

