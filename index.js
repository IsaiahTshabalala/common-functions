/** File: ./backend/utilityFunctions/commonFunctions.js
 * Description: Common functions to be put here.
 * Date        Dev   Version  Description
 * 2025/11/19  ITA   1.00     Genesis.
*/


function isValidUserName(userName) {
    if (!userName) // The username must be provided.
        return false;

    const regEx = /^[a-zA-Z][a-zA-Z0-9_-]{2,50}$/;
    return regEx.test(userName);
}
module.exports.isValidUserName = isValidUserName;

function isValidName(name) {
    if (!name) // The name must be provided.
        return false;

    const regEx = /^[A-Za-z' -]{2,50}$/;
    return regEx.test(name);
}
module.exports.isValidName = isValidName;

function isValidEmail(email) {
    if (!email)
        return false;

    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regEx.test(email);
}
module.exports.isValidEmail = isValidEmail;

function isValidPhoneNum(num) {
    if (!num) // The number must be provided.
        return false;

    const regEx = /^[0-9]{10,15}$/g;
    return regEx.test(num);
}
module.exports.isValidPhoneNum = isValidPhoneNum;

function isValidOrganisationName(name) {  
    if (!name) // The name must be provided.
        return false;

    const regEx = /^[a-zA-Z0-9.\-\(\) ]{2,}$/;
    return regEx.test(name);
}
module.exports.isValidOrganisationName = isValidOrganisationName;

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

/**
 * Get the paths (fields) of the plain Javascript object.
 * @param {object} anObject 
 * @returns a string array of paths.
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

/**
 * Determine whether an object contains only some or all of the specified fields, and not any other fields.
 * @param {*} anObject a Javascript object.
 * @param  {...string} fields one or more field names.
 * @returns boolean.
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
 * Determine whether an object contains all of the specified fields. It may have additional fields.
 * @param {*} anObject a Javascript object.
 * @param  {...string} fields one or field names.
 * @returns boolean.
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