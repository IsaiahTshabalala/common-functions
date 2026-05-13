/** File: ./backend/utilityFunctions/commonFunctions.js
 * Description: Common functions to be put here.
 * Start Date  End Date        Dev   Version  Description
 * 2025/11/19                  ITA   1.00     Genesis.
 * 2025/11/28                  ITA   1.01     Added function hasOnlyAll().
 * 2025/12/22                  ITA   1.02     Improved documentation of the functions and moved in more functions.
 * 2025/12/26                  ITA   1.03     Removed lodash dependency by re-implementing get() and set() object functions, significantly reducing this package size.
 *                                            Added function getNextDifferent() to deal better with duplicate removal from arrays of objects.
 * 2025/12/27                  ITA   1.04     Improved the functions getNoDuplicatesArray() and getNextDifferent() to handle more test cases.
 *                                            Added function unset().
 * 2025/12/28                  ITA   1.05     Improved documentation of functions to show better on the tooltip in IDEs.
 *                                            Improved deepClone() function to handle Date objects and arrays.
 *                                            Updated get() function to return undefined or supplied default value for paths that do not exist.
 *                                            Updated test.js file accordingly.
 * 2025/12/29                 ITA   1.06      Removed unnecessary use of the getPaths() function in the get() function to improve effieciency.
 * 2026/01/01                 ITA   1.07      Changed recursive functions to iterative functions, so as to overcome stack limits when functions are used in the front-end (browsers).
 * 2026/01/01                 ITA   1.08      Changed an additional recursive function to an iterative function.
 * 2026/01/03                 ITA   1.09      deepClone(): Used object spread to prevent reference sharing during object assignment.
 *                                            unset(): Replaced falsy-value evaluation with the `in` operator to correctly detect existing fields.
 * 2026/01/10 2026/10/10      ITA   1.10      get() and unset() functions: For field existence check, replaced the use of 'in' operator with checking whether the field value of the object is undefined.
 *                                            This prevents crashes resulting from using 'in' operator on undefined fields and objects.
 * 2026/01/10 2026/10/10      ITA   1.11      Added more robustness in dealing with non-existent fields in get() and unset() functions.
 * 2026/05/07 2026/05/08      ITA   1.12      Migrated to Typescript.
 *                                            Added a robust functionality for verifying whether a variable is a plain Typescript/Javacript object.
 * 2026/05/13 2026/05/13      ITA   1.13      Removed the <U> generic from get and set functions in favor of the unknown type. This relaxes the strict requirement for callers to provide explicit type parameters
 *                                            for return values and default values. By using unknown, the functions become more versatile and easier to use in broad scenarios,
 *                                            shifting the responsibility of type verification to the call site where the context is better known.
 *                                            objCompare function to enforce that the comparison fields of the concerned objects be primitive or date type, and be of the same type.
*/

/**Return true if userName is valid
 * @param {string} userName
 * @returns {boolean} true if a userName is valid, otherwise false.
 */
export function isValidUserName(userName: string): boolean {
    if (!userName) // The username must be provided.
        return false;

    const regEx = /^[a-zA-Z][a-zA-Z0-9_-]{2,50}$/;
    return regEx.test(userName);
}

/**Return true if a name is valid
 * @param {string} name
 * @returns {boolean} true if a name is valid, otherwise false.
 */
function isValidName(name: string): boolean {
    if (!name) // The name must be provided.
        return false;

    const regEx = /^[A-Za-z' -]{2,50}$/;
    return regEx.test(name);
}
export { isValidName };

/**Return true if userName is valid
 * @param {string} email
 * @returns {boolean} true if an email is valid, otherwise false.
 */
function isValidEmail(email: string): boolean {
    if (!email)
        return false;

    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regEx.test(email);
}
export { isValidEmail };

/**Return true if userName is valid
 * @param {string} num phone number
 * @returns {boolean} true if phone number is valid, otherwise false.
 */
function isValidPhoneNum(num: string): boolean {
    if (!num) // The number must be provided.
        return false;

    const regEx = /^[0-9]{10,15}$/g;
    return regEx.test(num);
}
export { isValidPhoneNum };

/**Return true if the name of an organisation is valid
 * @param {string} name an organisation name
 * @returns {boolean} true if an organisation name is valid, otherwise false.
 */
function isValidOrganisationName(name: string): boolean {
    if (!name) // The name must be provided.
        return false;

    const regEx = /^[a-zA-Z0-9.\-\(\) ]{2,}$/;
    return regEx.test(name);
}
export { isValidOrganisationName };

/**Return true if a password is valid
 * @param {string} password
 * @returns {boolean} true if a password is valid, otherwise false.
 */
function isValidPassword(password: string): boolean {
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
export { isValidPassword };

/** Converts the date object to a string of the form CCYY-MM-DD 
 * @param {Date} dateObj 
 * @returns {string} string of the form CCYY-MM-DD
 */
function timeStampYyyyMmDd(dateObj: Date): string {
    // Convert the date to string form yyyy-mm-dd
    let year = dateObj.getFullYear().toString();
    let month = (dateObj.getMonth() + 1).toString();
    month = addLeadingZeros(month, 2);
    let day = dateObj.getDate().toString();
    day = addLeadingZeros(day, 2);
    return `${year}-${month}-${day}`;
} // function timeStampYYYYMMDd(dateObj) { 
export { timeStampYyyyMmDd };

/** Converts a date object to a string of the form CCYY-MM-DDThh:mm:ss.ccc, e.g. '2024-02-25T15:00:25.251'
 * @param {Date} dateObj
 * @returns {string} a string of the form CCYY-MM-DDThh:mm:ss.ccc.
 */
function timeStampString(dateObj: Date): string {
    let hours = addLeadingZeros(dateObj.getHours().toString(), 2);
    let minutes = addLeadingZeros(dateObj.getMinutes().toString(), 2);
    let seconds = addLeadingZeros(dateObj.getSeconds().toString(), 2);
    let milliSec = addLeadingZeros(dateObj.getMilliseconds().toString(), 3);
    return `${timeStampYyyyMmDd(dateObj)}T${hours}:${minutes}:${seconds}.${milliSec}`;
} // function timeStampString(dateObj) {
export { timeStampString };

/** Returns a numeric string with trailing zeros.
 * E.g.
 * addLeadingZeros(9, 4) = '0009', addLeadingZeros(123, 5) = '00123'
 * @param {string | number} aNumber a numerical string or number.
 * @param {number} newLength the new length of the resulting string.
 * @returns a string of a number with the specified number of leading zeros.
 */
function addLeadingZeros(aNumber: string | number, newLength: number): string {
  
    let newString = aNumber + '';
    const howManyZeros = newLength - newString.length;
    for (let count = 1; count <= howManyZeros; count++)
        newString = '0' + newString;

    return newString;
} // function addLeadingZeros(aString, newLength) {
export { addLeadingZeros };

/**Convert numeric input to ZAR currency format string. 
 * @param {number | string} aNumber a number or numeric string.
 * @returns a string of the form R 256,534.00
*/
function toZarCurrencyFormat(aNumber: number | string): string {
    if (typeof aNumber === 'string') {
        aNumber = parseFloat(aNumber);
    }
    const zarCurrencyFormat = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'ZAR'});
    return zarCurrencyFormat.format(aNumber).replace(/ZAR/gi, 'R');
}
export { toZarCurrencyFormat };

/**
 * Check if a value is a plain Typescript/JavaScript object.
 * @param {any} value
 * @returns {boolean}
 */
function isPlainObject(value: any): value is Record<string, any> {
    if ((value === null) || (typeof value !== 'object')) { // Eliminate null, undefined and primitive types.
        return false;
    }
    if (Object.prototype.toString.call(value) !== '[object Object]') { // Eliminate arrays, functions, dates, object instances and other non-plain objects.
        return false;
    }
    return value.constructor === Object; // Eliminate objects created with custom constructors.
}
export { isPlainObject };

/**Return a deep clone of a document object.
 * By using deep cloning, you create a new object that is entirely separate from the original object.
 * 
 * So that whatever you do to that clone, such as deletion of fields, does not affect the original object.
 * 
 * NB. Works only plain Javascript/Typescript objects. Field values are not cloned if they are not plain Javascript objects, but are returned as is.
 * @template T
 * @param {T} obj a plain Typescript/Javascript object.
 * @returns a Typescript/Javascript object that is separate from the original object.
 * @note For a full deep clone of Arrays, Maps, and Sets (that throws on functions), consider using the native {@link structuredClone}.    
 */
function deepClone<T extends object>(obj: T): T {
    if (!isPlainObject(obj)) // Not a plain Javascript object, return as is.
        return obj;

    const stack: any[] = [{...obj}];
    let idx = 0;

    while (idx < stack.length) {
        let element = stack[idx];
        if (isPlainObject(element)) {
            for (let key in element) {
                if (element[key] instanceof Date) { // Date instance
                    element[key] = new Date(element[key]);
                }
                else if (isPlainObject(element[key])) { // Plain object instance
                    element[key] = {...element[key]}; // This helps to remove reference to the original object.
                }
                stack.push(element[key]);
            }
        }
        idx++;
    }
    return stack[0] as T;
} // function deepClone(obj) { // Return a deep clone of an object.
export { deepClone };

/**
 * Get the paths (fields) of the plain Javascript object.
 * @template T
 * @param {T} anObject  a plain Typescript/Javascript object.
 * @returns a sorted string array of paths.
 */
function getPaths<T extends object>(anObject: T): string[] {
    if (!isPlainObject(anObject)) // Not a plain Javascript object, empty array.
        return [];

    // This is where sub-objects are to be stacked, during traversal through the object.
    const stack: any[] = [{ value: anObject}];    
    let idx = 0;

    while (idx < stack.length) {
        const element = stack[idx];
        if (isPlainObject(element.value)) {
            for (const key in element.value) {
                let path = element.path? element.path + "." + key : key;
                stack.push(
                    { value: element.value[key], path }
                );
            }
            element.remove = true; /* This has an incomplete path, and will be removed later */
        }
        idx++;
    }
    return stack
            .filter(element => !(element.remove))
            .map(element => element.path);
} // function getPaths()
export { getPaths };


/** Return an object with sorted fields,  ordered by field name ascending.
 * 
 * The returned object is independent of the source object.
 * 
 * NB. For comparison of objects, please see objCompare() function.
 * @template T
 * @param {T} pObject plain Typescript/Javascript object.
 * @returns {T} an object with fields sorted in ascending order of field names.
*/
function getSortedObject<T extends object>(pObject: T): T {
    if (!isPlainObject(pObject)) // Not a plain Javascript object, return as is.
        return pObject;

    let cloneObj = deepClone(pObject);
    const paths = getPaths(cloneObj).toSorted();
    let sortedObj = {};
    let idx: number;
    for (idx = 0; idx < paths.length; idx++) {
        const path = paths[idx]!;
        const value = get(cloneObj, path);
        set(sortedObj, path, value);
    }
    return sortedObj as T;    
} // function getSortedObject(pObject) {
export { getSortedObject };

/** Get the value of a field specified by the path from an object.
 * @template T
 * @param {T} anObject a Typescript/Javascript object.
 * @param {string} path a path specifying the field whose value is to be obtained.
 * @param {unknown} [defaultVal=undefined] a default value to return if the path does not exist on the object.
 * @returns {unknown} the value of the field specified by the path, otherwise a default value if supplied.
 */
function get<T extends object>(anObject: T, path: string,
                                              defaultVal: unknown = undefined): unknown {
    if (!isPlainObject(anObject)) // Not a plain Javascript object, return undefined.
        return undefined;
        
    let paths = path.split('.');
    let tempObj: any = anObject;
    for (let idx = 0; idx < paths.length; idx++) {
        let key = paths[idx]!;
        if (!(key in tempObj)) // key not found.
            return defaultVal;

        tempObj = tempObj[key];
        if (tempObj === undefined)
            return defaultVal;        
    }
    if (paths.length === 0) // Empty path, return default value.
        return defaultVal;

    return tempObj;
}
export { get };

/** Set the value of a field specified by the path on an object.
 * @template T
 * @param {object} anObject a Typescript/Javascript object.
 * @param {string} path a path specifying the field whose value is to be set.
 */
function set<T extends object>(anObject: T, path: string, value: unknown): void {
    if (!isPlainObject(anObject)) // Not a plain Typescript/Javascript object. Do nothing.
        return;

    let tempObj: any = anObject;
    let paths = path.split('.');
    for (let idx = 0; idx < paths.length; idx++) {
        let key = paths[idx]!;
        if (idx < paths.length - 1) {
            if (!isPlainObject(tempObj)) // Not a plain Typescript/Javascript object, do nothing.
                return;
            if (!(key in tempObj))
                tempObj[key] = {};        
            
            tempObj = tempObj[key];
        }
        else
            tempObj[key] = value;
    }
}
export { set };

/** Unset the value of a field specified by the path on an object.
 * @template T
 * @param {T} anObject a Typescript/Javascript object.
 * @param {string} path a path specifying the field whose value is to be set.
 */
function unset<T extends object>(anObject: T, path: string): void {
    if (!isPlainObject(anObject)) // Not a plain Typescript/Javascript object, do nothing.
        return;

    let paths = path.split('.');
    let tempObj: any = anObject;
    for (let idx = 0; idx < paths.length; idx++) {
        let key = paths[idx]!;
        if (!isPlainObject(tempObj))
            return;
        if (!(key in tempObj))
            return;
        if (idx < paths.length - 1)
            tempObj = tempObj[key];
        else
            delete tempObj[key];
    }
}
export { unset };

/**
 * Determine whether an object contains only 1, some or all of the specified fields, and not any other fields.
 * @template T
 * @param {T} anObject a Javascript object.
 * @param  {...string[]} fields one or more field names.
 * @returns boolean true or false.
 */
function hasOnly<T extends object>(anObject: T, ...fields: string[]): boolean {
    if (!isPlainObject(anObject)) // Not a plain Javascript object, return false.
        return false;

    if (!fields || !(fields.length))
        throw new Error('fields must be specified');

    const paths = getPaths(anObject);
    let count = 0;
    for (const index in paths) {
        const path = paths[index]!;

        if (!fields.includes(path))
            return false;
        else
            count++;
    } // for (const index in paths)

    return (count > 0);
}
export { hasOnly };

/**
 * Determine whether an object contains all of the specified fields in addition to other fields.
 * @template T
 * @param {T} anObject a Javascript object.
 * @param  {...string[]} fields one or field names.
 * @returns boolean true or false.
 */
function hasAll<T extends object>(anObject: T, ...fields: string[]): boolean {
    if (!fields || !fields.length)
        throw new Error('fields must be specified');
    
    const paths = getPaths(anObject);
    let count = 0;
    for (const index in fields) {
        const field = fields[index]!;

        if (!paths.includes(field))
            return false;
        else
            count++;
    } // for (const index in paths)

    return (count === fields.length);
}
export { hasAll };

/**
 * Determine whether an object contains only all of the specified fields. Nothing more, nothing less.
 * @param {T} anObject a Javascript object.
 * @param  {...string[]} fields one or field names.
 * @returns boolean true or false.
 */
function hasOnlyAll<T extends object>(anObject: T, ...fields: string[]): boolean {
    return hasOnly(anObject, ...fields) && hasAll(anObject, ...fields);
}
export { hasOnlyAll };

/**Binary Search the sorted primitive data array for a value and return the index.
 * 
 * ArraySortDir specifies the direction in which the array is sorted (desc or asc).
 * 
 * If the array contains the value searched for, then the index returned is the location of this value on the array,
 * otherwise, the index is of closest value in the array that is before or after the search value in terms of sort order.
 * 
 * This function can be used also in cases where values are to be inserted into the array while maintaining sort order.
 * @template T
 * @param {Array<T>} anArray an array of primitve type. All element must be the same type.
 * @param {T} searchVal search value
 * @param {number} [startFrom=0] index from which to start. Default: 0.
 * @param {'asc' | 'desc'} [arraySortDir='asc'] sort direction. Must be 'asc' or 'desc'. Default: 'asc'
 * @returns {number} an index. -1 mean value not found.
 */
function binarySearch<T>(anArray: T[], searchVal: T,
                         startFrom: number = 0, arraySortDir: 'asc' | 'desc' = 'asc'): number {

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
export { binarySearch };

/** Compare two values of the same primitive type, according to the sort direction.
 * May be used with dates, numbers, booleans and strings. For other types, the result is unpredictable.
 * 
 * A return value of -1 means that value1 is before value2 in terms of sort order.
 * 
 * A return value of 1 means that value1 is after value2 in terms of sort order.
 * 
 * A return value of 0 means that value1 is equal to value2.
 * @template T
 * @param {T} value1
 * @param {T} value2
 * @param {'asc' | 'desc'} [sortDir='asc'] sort direction. Must be 'asc' or 'desc'. Default: 'asc'
 * @returns {number}  -1, 0 or 1
*/
function compare<T>(value1: T, value2: T, sortDir: 'asc' | 'desc' = 'asc'): number {
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
export { compare };

/**Binary Search the sorted (ascending or descending order) array of plain Typescript/Javascript objects for a value and return the index.
 * 
 * The assumption is that the array is sorted in order of 1 or more sort fields,
 * 
 * Examples of sort fields: 'lastName asc', 'firstName', 'address.province asc', 'address.townOrCity asc'.
 * 
 * If the array contains the object with values searched for, then the index returned is the location of this value in the array, otherwise,
 * the index is of the closest value in the array that is before or after the searchObj value.
 * Return -1 for an empty array.
 * Assumed field data types are numbers, strings, booleans and dates.
 * This function is to be used also in cases where objects are to be inserted into the array while maintaining sort order.
 * @template T
 * @param {Array<T>} objArray an array of Javascript objects.
 * @param {T} searchObj an object to search for.
 * @param {number} [startFrom=0] index from which to start searching.
 * @param {...string[]} sortFields one or more search fields.
 * @returns {number} an index.
 */
function binarySearchObj<T extends object>(objArray: T[], searchObj: T, startFrom: number = 0,
                                            ...sortFields: string[]): number {
    if (!sortFields || !sortFields.length)
        throw new Error('At least one sort field is required.');

    if (objArray.length === 0)
        return -1;

    if (objArray.some(element => !isPlainObject(element)))
        throw new Error('All elements in objArray must be plain objects.');

    let start = startFrom,
        end = objArray.length - 1;

    while(start < end) {
        if (objCompare(objArray[start]!, searchObj, ...sortFields) === 0)
            return start;
        else if (objCompare(objArray[end]!, searchObj, ...sortFields) === 0)
            return end;

        let mid = Math.trunc((start + end) / 2);

        if (objCompare(objArray[mid]!, searchObj, ...sortFields) < 0)
            start = mid + 1;
        else if (objCompare(objArray[mid]!, searchObj, ...sortFields) > 0)
            end = mid - 1;
        else
            return mid;
    } // while(start < end) {
    
    return start;
} // function binarySearchObj(objArray, searchObj, ...comparisonFields) {
export {binarySearchObj};

/**Get the index of the first element in an object array that is different from the target element 
 * according to the comparison fields.
 * @template T
 * @param {Array<T>} objArray an array of objects
 * @param {T} targetObj target object
 * @param {number} startFrom index from which to start searching
 * @param {...string[]} comparisonFields the fields sort order of the array. e.g. 'score desc', 'numGames asc'.
 * @returns index of the next different object.
 */
function getNextDifferent<T extends object>(objArray: T[], targetObj: T, startFrom: number,
                                            ...comparisonFields: string[]): number {
    if (!comparisonFields || !comparisonFields.length)
        throw new Error('At least one comparison field is required.');
    if (objArray.length === 0)
        return -1;
    if (objArray.some(element => !isPlainObject(element)))
        throw new Error('All elements in objArray must be plain objects.');

    let start = startFrom,
          end = objArray.length - 1;
    
    if (start >= objArray.length) { // throw error if startFrom is outside the bounds of the array.
        throw new Error('startFrom is outside the bounds of the array.');
    }
    // If target object is to the right of objArray[start], then throw an error..
    if (objCompare(targetObj, objArray[start]!, ...comparisonFields) > 0) {
        throw new Error('targetObj is to the right (\'greater than\') objArray[startFrom].');
    }
         
    while (start < end) {   
        let mid = Math.trunc((start + end) / 2);
        if (objCompare(targetObj, objArray[mid]!, ...comparisonFields) === 0) {
            start = mid + 1;
        }
        else if (objCompare(targetObj, objArray[mid]!, ...comparisonFields) < 0) {
            end = mid;
        }
    }
    if (objCompare(targetObj, objArray[start]!, ...comparisonFields) === 0)
        return -1;
    return start;
}
export {getNextDifferent};

/**Create an array with duplicates eliminated, according to certain fields. Taking only the first or last object from each duplicate set.
 * 
 * If firstOfDuplicates === true, then the first element in each set of duplicates is taken.
 * 
 * if firstOfDuplicates === false, then the last element is taken from each set of duplicates.
 * 
 * Assumed comparison field data types are Boolean, Number, String, Date.
 * 
 * The array must be sorted according to the comparison fields before calling this function.
 * The value of the comparison field must include both the field name and sort direction.
 * Sort direction assumed to be "asc" if not provided.
 * Examples of comparison fields: "firstName", "lastName desc", "address.province asc", "address.townOrCity".
 * @template T
 * @param {Array<T>} objArray an input array of objects
 * @param {boolean} firstOfDuplicates specify whether to take the first or last object in each a duplicate set.
 * @param {...string[]} comparisonFields comparison fieds plus sort order.
 * @returns {Array<T>} an array with no duplicates.
 */
function getObjArrayWithNoDuplicates<T extends object>(objArray: T[], firstOfDuplicates: boolean,
                                                        ...comparisonFields: string[]): T[] {

    if (objArray.length <= 1)
        return [...objArray];

    if (typeof firstOfDuplicates !== 'boolean')
        throw new Error(`firstOfDuplicates must be boolean true or false.`);

    if (!comparisonFields || !comparisonFields.length)
        throw new Error('At least one comparison field is required.');

    if (objArray.some(element => !isPlainObject(element)))
        throw new Error('All elements in objArray must be plain objects.');

    const noDuplicates: T[] = [];
    let grpStart = 0; // Start index of current duplicate group.
    while (grpStart < objArray.length - 1) {
        if (firstOfDuplicates) {
            noDuplicates.push(objArray[grpStart]!);
        }

        grpStart = getNextDifferent(objArray, objArray[grpStart]!, grpStart + 1, ...comparisonFields);
        if (grpStart < 0)
            break; // No more different objects.

        let grpEnd = grpStart - 1;
        if (!firstOfDuplicates) {
            noDuplicates.push(objArray[grpEnd]!);
        }
    }
    if (noDuplicates.length === 0) { // All objects are duplicates.
        if (firstOfDuplicates)
            noDuplicates.push(objArray[0]!);
        else
            noDuplicates.push(objArray[objArray.length - 1]!);
    }
    else {
        if (objCompare(noDuplicates[noDuplicates.length - 1]!, objArray[objArray.length - 1]!, ...comparisonFields) !== 0) {
            noDuplicates.push(objArray[objArray.length - 1]!);
        }
    }

    return noDuplicates;
} // function getObjArrayWithNoDuplicates(objArray, ...comparisonFields) {
export {getObjArrayWithNoDuplicates};

/**Compare 2 objects according to the comparison fields, and return the result of:
 * 
 * -1 if obj1 is before obj2, 1 if obj1 is after obj2, 0 if obj1 is equal to obj2.
 * 
 * Each each of the comparisonFields must be of the form 'fieldName sortDirection' or 'fieldName'.
 *  
 * Sort directions: 'asc', 'desc'.
 * 
 * Field/sort-direction examples: 'lastName desc', 'firstName', 'firstName asc', 'address.provinceName asc'.
 * 
 * If sort direction is not provided, then it is assumed to be ascending.
 * @template T
 * @param {T} obj1 first object to compare
 * @param {T} obj2 second object to compare
 * @param  {...string[]} comparisonFields one or more comparison fields plus sort order.
 * @returns {number} comparison result: -1, 0 or 1.
*/
function objCompare<T extends object>(obj1: T, obj2: T, ...comparisonFields: string[]): number {
    if (!comparisonFields || !comparisonFields.length)
        throw new Error('comparisonFields not supplied!');
    if (!isPlainObject(obj1) || !isPlainObject(obj2))
        throw new Error('Both obj1 and obj2 must be plain objects.');

    const sortDirections = ['', 'asc', 'desc'];
    for (let index = 0; index < comparisonFields.length; index++) {
        const field = comparisonFields[index]!.split(' ');
        const fieldName = field[0]!;
        let sortDir = '';
        if (field.length > 2)
            throw new Error('Each comparison field must be of the form \'fieldName sortDirection\' or \'fieldName\'.');
        if (field.length === 2)
            sortDir = field[1]!;

        if (!sortDirections.includes(sortDir))
            throw new Error('Sort direction must be one of ' + sortDirections.toString());

        const value1: any = get(obj1, fieldName);
        const value2: any = get(obj2, fieldName);
        const primitiveTypes = ['string', 'number', 'bigint', 'boolean'];
        if (!(primitiveTypes.includes(typeof value1) || primitiveTypes.includes(typeof value2)
            || (value1 instanceof Date) || (value2 instanceof Date))) {
            throw new Error("Comparison values must be primitive type or Date instance");
        }
        if (typeof(value1) !== typeof(value2)) {
            throw new Error("Comparison values must be of the same type");
        }

        const returnValue = (sortDir === 'desc'? -1: 1);
        if (value1 > value2)
            return returnValue;
        else if (value1 < value2)
            return -returnValue;
    } // for (const field in comparisonFields) {
    return 0;
} // function comparison(obj1, obj2, ...comparisonFields) {
export {objCompare};
