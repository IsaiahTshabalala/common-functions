/** File: ./backend/utilityFunctions/commonFunctions.js
 * Description: Common functions to be put here.
 * Date        Dev   Version  Description
 * 2025/11/19  ITA   1.00     Genesis.
 * 2025/11/28  ITA   1.01     Added function hasOnlyAll().
 * 2025/12/22  ITA   1.02     Improved documentation of the functions and moved in more functions.
*/
const loDash = require('lodash');

/**Return true if userName is valid
 * @param {string} userName
 * @returns {boolean} true if a userName is valid, otherwise false.
 */
function isValidUserName(userName) {
    if (!userName) // The username must be provided.
        return false;

    const regEx = /^[a-zA-Z][a-zA-Z0-9_-]{2,50}$/;
    return regEx.test(userName);
}
module.exports.isValidUserName = isValidUserName;

/**Return true if a name is valid
 * @param {string} name
 * @returns {boolean} true if a name is valid, otherwise false.
 */
function isValidName(name) {
    if (!name) // The name must be provided.
        return false;

    const regEx = /^[A-Za-z' -]{2,50}$/;
    return regEx.test(name);
}
module.exports.isValidName = isValidName;

/**Return true if userName is valid
 * @param {string} email
 * @returns {boolean} true if an email is valid, otherwise false.
 */
function isValidEmail(email) {
    if (!email)
        return false;

    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regEx.test(email);
}
module.exports.isValidEmail = isValidEmail;

/**Return true if userName is valid
 * @param {string} num phone number
 * @returns {boolean} true if phone number is valid, otherwise false.
 */
function isValidPhoneNum(num) {
    if (!num) // The number must be provided.
        return false;

    const regEx = /^[0-9]{10,15}$/g;
    return regEx.test(num);
}
module.exports.isValidPhoneNum = isValidPhoneNum;

/**Return true if the name of an organisation is valid
 * @param {string} name an organisation name
 * @returns {boolean} true if an organisation name is valid, otherwise false.
 */
function isValidOrganisationName(name) {  
    if (!name) // The name must be provided.
        return false;

    const regEx = /^[a-zA-Z0-9.\-\(\) ]{2,}$/;
    return regEx.test(name);
}
module.exports.isValidOrganisationName = isValidOrganisationName;

/**Return true if a password is valid
 * @param {string} password
 * @returns {boolean} true if a password is valid, otherwise false.
 */
function isValidPassword(password) {
    if (!password)
        return false;

    // Password must be at least 6 characters long
    if (password.length < 6)
        return false;

    // Must contain at least 1 uppercase letter
    if (/[A-Z]/.test(password) === false)
        return false;
    
      // Must contain at least 1 lowercase letter
    if (/[a-z]/.test(password) === false)
        return false;
    
    // Must contain at least 1 number
    if (/[0-9]/.test(password) === false)
        return false;

    // Must not contain white space characters
    if (/[\s]/.test(password))
        return false;
    
    // Must contain atleast 1 symbol
    if (/[\][!"#$%&'()*+,./:;<=>?@^\\_`{|}~-]/.test(password) === false)
        return false;
  
    return true;
}
module.exports.isValidPassword = isValidPassword;

/** Converts the date object to a string of the form CCYY-MM-DD 
 * @param {Date} dateObj 
 * @returns {string} string of the form CCYY-MM-DD
 */
function timeStampYyyyMmDd(dateObj) {
    // Convert the date to string form yyyy-mm-dd
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    month = addLeadingZeros(month, 2);
    let day = dateObj.getDate();
    day = addLeadingZeros(day, 2);
    return `${year}-${month}-${day}`;
} // function timeStampYYYYMMDd(dateObj) { 
module.exports.timeStampYyyyMmDd = timeStampYyyyMmDd;

/** Converts a date object to a string of the form CCYY-MM-DDThh:mm:ss.ccc, e.g. '2024-02-25T15:00:25.251'
 * @param {Date} dateObj
 * @returns {string} a string of the form CCYY-MM-DDThh:mm:ss.ccc.
 */
function timeStampString(dateObj) {
    let hours = addLeadingZeros(dateObj.getHours(), 2);
    let minutes = addLeadingZeros(dateObj.getMinutes(), 2);
    let seconds = addLeadingZeros(dateObj.getSeconds(), 2);
    let milliSec = addLeadingZeros(dateObj.getMilliseconds(), 3);
    return `${timeStampYyyyMmDd(dateObj)}T${hours}:${minutes}:${seconds}.${milliSec}`;
} // function timeStampString(dateObj) {
module.exports.timeStampString = timeStampString;


/** Return a numeric string with trailing zeros.
 * E.g. addLeadingZeros(9, 3) = '009'
 * Inputs: 
 * @param {Number} aNumber an integer or integer string.
 * @param {Number} newLength the new length of the resulting string.
 * @returns a string of a number with the specified number of leading zeros.
 */
function addLeadingZeros(aNumber, newLength) {
  
    let newString = aNumber + '';
    const howManyZeros = newLength - newString.length;
    for (let count = 1; count <= howManyZeros; count++)
        newString = '0' + newString;

    return newString;
} // function addLeadingZeros(aString, newLength) {
module.exports.addLeadingZeros = addLeadingZeros;

/**Convert numeric input to ZAR currency format string. 
 * @param {Number} a number
 * @returns a string of the form R 256,534.00
*/
function toZarCurrencyFormat(number) {
    const zarCurrencyFormat = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'ZAR'});
    return zarCurrencyFormat.format(number).replace(/ZAR/gi, 'R');
}
module.exports.toZarCurrencyFormat = toZarCurrencyFormat;

/**Return a deep clone of a document object.
 * By using deep cloning, you create a new object that is entirely separate from the original original.
 * So that whatever you do to that clone, such as deletion of fields, does not affect the original.
 * NB. Class instance types will be converted to plain object types due to stringification.
 * @param {object} obj a plain Javascript object.
 * @returns a Javascript object that is separate from the original object.
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
} // function deepClone(obj) { // Return a deep clone of an object.
module.exports.deepClone = deepClone;


/**
 * Get the paths (fields) of the plain Javascript object.
 * @param {object} anObject  a plain Javascript object.
 * @returns a sorted string array of paths.
 */
function getPaths(anObject) {
    const paths = [];
    if (!(Object.prototype.toString.call(anObject) === '[object Object]'))
        return paths;
    
    for (const path in anObject) {
        const nestedPaths = getPaths(anObject[path]);
        if (nestedPaths.length > 0) {
            nestedPaths.forEach(nestedPath=> {
                paths.push(path + '.' + nestedPath); 
            });
        }
        else
            paths.push(path);
    }
    paths.sort();
    return paths;
} // function getPaths()
module.exports.getPaths = getPaths;

/** Return an object with sorted fields, by ordered by field name ascending.
 * This is desirable when equality comparison is done to ensure two objects sharing equal field values
 * the pass the equality test stringify(object1) === stringify(object2)
 * @param {object} pObject 
 * @returns {object} an object with fields sorted in ascending order of field names.
*/
function getSortedObject(pObject) {

  const paths = getPaths(pObject);
  paths.sort();
  const sortedObject = {};

  for (let index in paths) {
      const path = paths[index];
      const value = loDash.get(pObject, path);
      loDash.set(sortedObject, path, value);
  } // for (index in paths) {
  return sortedObject;
} // function getSortedObject(pObject) {
module.exports.getSortedObject = getSortedObject;

/**
 * Determine whether an object contains only 1, some or all of the specified fields, and not any other fields.
 * @param {object} anObject a Javascript object.
 * @param  {...string} fields one or more field names.
 * @returns boolean true or false.
 */
function hasOnly(anObject, ...fields) {
    if (!fields || !fields.length)
        throw new Error('fields must be specified');

    const paths = getPaths(anObject);
    let count = 0;
    for (const index in paths) {
        const path = paths[index];

        if (!fields.includes(path))
            return false;
        else
            count++;
    } // for (const index in paths)

    return (count > 0);
}
module.exports.hasOnly = hasOnly;

/**
 * Determine whether an object contains all of the specified fields in addition to other fields.
 * @param {object} anObject a Javascript object.
 * @param  {...string} fields one or field names.
 * @returns boolean true or false.
 */
function hasAll(anObject, ...fields) {
    if (!fields || !fields.length)
        throw new Error('fields must be specified');
    
    const paths = getPaths(anObject);
    let count = 0;
    for (const index in fields) {
        const field = fields[index];

        if (!paths.includes(field))
            return false;
        else
            count++;
    } // for (const index in paths)

    return (count === fields.length);
}
module.exports.hasAll = hasAll;

/**
 * Determine whether an object contains only all of the specified fields. Nothing more, nothing less.
 * @param {object} anObject a Javascript object.
 * @param  {...string} fields one or field names.
 * @returns boolean true or false.
 */
function hasOnlyAll(anObject, ...fields) {
    return hasOnly(anObject, ...fields) && hasAll(anObject, ...fields);
}
module.exports.hasOnlyAll = hasOnlyAll;

/**Binary Search the sorted primitive data array for a value and return the index.
 * ArraySortDir specifies the direction in which the array is sorted (desc or asc).
 * If the array contains the value searched for, then the index returned is the location of this value on the array,
 * otherwise, the index is of closest value in the array that is before or after the search value in terms of sort order.
 * Return -1 for an empty array.
 * This function is to be used also in cases where values are to be inserted into the array while maintaining sort order.
 * @param {Array} anArray an array of primitve type. All element must be the same type.
 * @param {*} searchVal search value
 * @param {number} [startFrom=0] index from which to start. Default: 0.
 * @param {string} [arraySortDir='asc'] sort direction. Must be 'asc' or 'desc'. Default: 'asc'
 * @returns {number} an index
 */
function binarySearch(anArray, searchVal, startFrom = 0, arraySortDir = 'asc') {

    const sortDirections = ['asc', 'desc']
    if (!['asc', 'desc'].includes(arraySortDir))
        throw new Error(`arraySortDir must be one of ${sortDirections}`);

    if (anArray.length === 0)
        return -1; // Empty array.

    let start = startFrom,
        end = anArray.length - 1;

    while(start < end) {
        if (compare(anArray[start], searchVal) === 0)
            return start;
        else if (compare(anArray[end], searchVal) === 0)
            return end;

        const mid = Math.trunc((start + end) / 2);
        const comparison = compare(anArray[mid], searchVal, arraySortDir);
        if (comparison < 0)
            start = mid + 1;
        else if (comparison > 0)
            end = mid - 1;
        else
            return mid;
    } // while(start < end) {

    return start;
} // function binarySearch(anArray, arraySortDir, searchVal) {
module.exports.binarySearch = binarySearch;

/** Compare two values of the same primitive type, according to the sort direction.
 * A return value of -1 means that value1 is before value2 in terms of sort order.
 * A return value of 1 means that value1 is after value2 in terms of sort order.
 * A return value of 0 means that value1 is equal to value2.
 * @param {*} value1
 * @param {*} value2
 * @param {string} [sortDir='asc'] 
 * @returns {number} integer (-1, 0 or 1)
*/
function compare(value1, value2, sortDir = 'asc') {
    if (!['asc', 'desc'].includes(sortDir))
        throw new Error(`sortDir must be one of ${sortDir}`);

    const returnValue = (sortDir === 'desc'? -1 : 1);
    if (value1 > value2)
        return returnValue;
    else if (value1 < value2)
        return -returnValue;
    else // Avoid if (value1 === value2) because this may yield false for reference types (ie. Dates), because of different memory addresses.
        return 0;
} // function compare(value1, value2, sortDir) {
module.exports.compare = compare;

/**Binary Search the sorted (ascending or descending order) array of objects for a value and return the index.
 * The assumption is that the array is sorted in order of 1 or more sort fields,
 * for example'lastName asc', 'firstName', 'address.province asc', 'address.townOrCity asc'.
 * If the array contains the object with values searched for, then the index returned is the location of this value in the array,
 * otherwise, the index is of the closest value in the array that is before or after the searchObj value.
 * Return -1 for an empty array.
 * Assumed field data types are Number, String and Date.
 * This function is to be used also in cases where objects are to be inserted into the array while maintaining sort order.
 * @param {Array<object} objArray an array of Javascript objects.
 * @param {object} searchObj an object to search for.
 * @@param {number} [startFrom=0] index from which to start searching.
 * @param {...string} sortFields one or more search fields.
 * @returns {number} an index.
 */
function binarySearchObj(objArray, searchObj, startFrom = 0, ...sortFields) {
    if (objArray.length === 0)
        return -1;

    let start = startFrom,
        end = objArray.length - 1;

    while(start < end) {
        if (objCompare(objArray[start], searchObj, ...sortFields) === 0)
            return start;
        else if (objCompare(objArray[end], searchObj, ...sortFields) === 0)
            return end;

        let mid = Math.trunc((start + end) / 2);

        if (objCompare(objArray[mid], searchObj, ...sortFields) < 0)
            start = mid + 1;
        else if (objCompare(objArray[mid], searchObj, ...sortFields) > 0)
            end = mid - 1;
        else
            return mid;
    } // while(start < end) {
    
    return start;
} // function binarySearchObj(objArray, searchObj, ...comparisonFields) {
module.exports.binarySearchObj = binarySearchObj;

/**Create an array with duplicates eliminated, according to certain fields. Taking only the first or last object from each duplicate set.
 * If firstOfDuplicates === true, then the first element in each set of duplicates is taken.
 * if firstOfDuplicates === false, then the last element is taken from each set of duplicates.
 * Assumed field data types are Number, String and Date.
 * The array must be sorted according to the comparison fields before calling this function.
 * The value of the comparison field must include both the field name and sort direction.
 * Sort direction assumed to be "asc" if not provided.
 * Examples of comparison fields: "firstName", "lastName desc", "address.province asc", "address.townOrCity".
 * @param {Array<object>} objArray an input array of objects
 * @param {boolean} firstOfDuplicates specify whether to take the first or last object in each a duplicate set.
 * @param {...string} comparisonFields comparison fieds plus sort order.
 * @returns {Array<object>} an array with no duplicates.
 */
function getObjArrayWithNoDuplicates(objArray, firstOfDuplicates, ...comparisonFields) {
    function getNextSearchObj(pNext) {
        const nextObj = {...objArray[next]};
        let lastField;
        if (comparisonFields.length > 0)
            lastField = comparisonFields[comparisonFields.length - 1].split(' ');
        else
            throw new Error('Supply atleast 1 comparisonFields parameter.');

        const lastFieldName = lastField[0];
        const sortDir = lastField.length > 1? lastField[1] : 'asc';
        const lastFieldValue = loDash.get(nextObj, lastFieldName);

        if (typeof lastFieldValue === 'number') {
            if (sortDir === 'asc')
                loDash.set(nextObj, lastFieldName, 1e-10 + lastFieldValue);
            else
                loDash.set(nextObj, lastFieldName, -1e-10 + lastFieldValue);
        }
        else if (typeof lastFieldValue === 'string') { // instance of String
            if (sortDir === 'asc')
                loDash.set(nextObj, lastFieldName, lastFieldValue + ' ');
            else
                loDash.set(nextObj, lastFieldName, ' ' + lastFieldValue);
        }
        else if (lastFieldValue instanceof Date) {
            if (sortDir === 'asc')
                loDash.set(nextObj, lastFieldName, new Date(1 + lastFieldValue.getTime()));
            else
                loDash.set(nextObj, lastFieldName, new Date(-1 + lastFieldValue.getTime()));
        }
        else
            throw new Error(`${lastFieldName} must be type Number, String or Date`);

        return nextObj;
    } // function getNextSearchObj(pNext)

    if (objArray.length <= 1)
        return [...objArray];

    if (![true, false].includes(firstOfDuplicates))
        throw new Error(`firstOfDuplicates must be one of ${[true, false]}`);

    const noDuplicates = [];

    let next = 0;
    let nextSearchObj;
    if ((firstOfDuplicates)) {
        noDuplicates.push(objArray[next]);
    }        
    nextSearchObj = getNextSearchObj(objArray[next]);

    while (next < objArray.length) {
        // The aim is to jump to the next element that is not a duplicate of objArray[next].
        next = binarySearchObj(objArray, nextSearchObj, next, ...comparisonFields);
        let comparison = objCompare(objArray[next], nextSearchObj, ...comparisonFields);
        if (comparison < 0) {
            if (firstOfDuplicates) {
                next++;
                if  (next < objArray.length) {
                    noDuplicates.push(objArray[next]);
                    nextSearchObj = getNextSearchObj(objArray[next]);
                }
            }
            else  {
                noDuplicates.push(objArray[next]);
                next++;
                if (next < objArray.length)
                    nextSearchObj = getNextSearchObj(objArray[next]);
            }
            continue;
        }
        else {
            if (!firstOfDuplicates) {
                noDuplicates.push(objArray[next]);
            }
            else {
                noDuplicates.push(objArray[next]);
            }
        }
        
        nextSearchObj = getNextSearchObj(objArray[next]);
        next++;
    } // while (comparison !== 0 && next < objArray.length) {

    return noDuplicates;
} // function getObjArrayWithNoDuplicates(objArray, ...comparisonFields) {
module.exports.getObjArrayWithNoDuplicates = getObjArrayWithNoDuplicates;

/**Compare 2 objects according to the comparison fields specified in the comparison fields, and return the result.
 * Each each of the comparisonFields must be of the form 'fieldName sortDirection' or 'fieldName'. 
 * Sort directions: 'asc', 'desc'.
 * Examples: 'lastName desc', 'firstName', 'firstName asc', 'address.provinceName asc'.
 * If sort direction is not provided, then it is assumed to be ascending.
 * @param {object} obj1 first object to compare
 * @param {object} obj2 second object to compare
 * @returns {number} a comparison value of 1, 0 or -1
*/
function objCompare(obj1, obj2, ...comparisonFields) {
    if (comparisonFields.length === 0)
        throw new Error('comparisonFields not supplied!');

    const sortDirections = ['', 'asc', 'desc'];
    for (const index in comparisonFields) {
        const field = comparisonFields[index].split(' ');
        const fieldName = field[0];
        let sortDir = '';
        if (field.length === 2)
            sortDir = field[1];

        if (!sortDirections.includes(sortDir))
            throw new Error('Sort direction must be one of ' + sortDirections.toString());

        const value1 = loDash.get(obj1, fieldName);
        const value2 = loDash.get(obj2, fieldName);

        const returnValue = (sortDir === 'desc'? -1: 1);
        if (value1 > value2)
            return returnValue;
        else if (value1 < value2)
            return -returnValue;
    } // for (const field in comparisonFields) {
    return 0;
} // function comparison(obj1, obj2, ...comparisonFields) {
module.exports.objCompare = objCompare;