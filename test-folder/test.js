/*
Date        Version  Description
----------  -------  -----------------------------------------------------------
2025/11/18  1.0.0    Initial version.
2025/11/20  1.0.1    Added tests for use as examples in README.md for the functions objCompare, binarySearchObj and getObjArrayWithNoDuplicates.
2025/11/20  1.0.2    Corrected test code.
*/
const commonFunctions = require('some-common-functions-js');
/**Note to the developer: LOCAL TESTING INSTRUCTIONS:
 * To "publish" your package locally, run "npm link" from the root folder of this project,
 * then run "npm link some-common-functions-js" from test-folder.
 * Then, run "node test.js" from test-folder to execute this test file.
 */

let anObject = {
    firstName: "Isaiah",
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

let anObject2 = {
    firstName: "Albertina",
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

console.log(commonFunctions.objCompare(anObject, anObject2, "lastName", "firstName")); // -1 because "Tshabalala Isaiah" is before "Tshabalala Lindiwe" according to ascending order.
console.log(commonFunctions.objCompare(anObject, anObject2, "address.country.name", "address.city", "address.mainPlace")); // 1 because "Johannesburg" is after "Vereeniging" according to descending order.
console.log("----END OF objCompare test----");


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

// Using objCompare to sort an array of objects.
let objArray = [anObject2, anObject, anObject3];

// Sort objects in objArray using multiple fields including nested fields.
objArray.sort((obj1, obj2)=> {
                    return commonFunctions.objCompare(
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
console.log("----END OF objComparison sort test----");

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
// Sort by score descending, then by numGames ascending.
teams.sort((team1, team2) => {
    return commonFunctions.objCompare(
                                        team1, team2,
                                        "score desc",
                                        "numGames asc"
                                    );
});
console.log(teams);
console.log("----END OF objComparison sort test with mixed order test----");

console.log(commonFunctions.getPaths(anObject));
console.log("----END OF getPaths test----");

console.log(commonFunctions.hasOnly(anObject, "firstName", "lastName", "address.houseNum",
                                    "address.streetName", "address.city", "address.country.name", "address.country.code"));
                                    // false, because because anObject has address.mainPlace and address.subPlace which are extra to the specified fields.
console.log("----END OF hasOnly test----");

console.log(commonFunctions.hasAll(anObject, "firstName", "lastName", "address.houseNum",
                                    "address.streetName", "address.city", "address.country.name", "address.country.code"));
                                    // true, because anObject has all the specified fields, and more (allowed)
console.log("----END OF hasAll test----");

console.log(commonFunctions.hasOnlyAll(anObject, "firstName", "lastName", "address.houseNum",
                                    "address.streetName", "address.city", "address.country.name", "address.country.code"));
                                    // false, because anObject has address.mainPlace and address.subPlace which are extra to the specified fields.

console.log("----END OF hasOnlyAll test----");    

console.log(commonFunctions.getSortedObject(anObject));

console.log("----END OF getSortedObject test----");    


let myArray = [100, 101, 102, 103, 104, 105, 106, 107];  
console.log(commonFunctions.binarySearch(myArray, 103, 4)); // 4
let result = commonFunctions.compare(103, myArray[4]); // -1, meaning sought value 103 is less than or before myArray[4].
console.log(result);
console.log("----END OF binarySearch test----");

let x = "Jiāng Fāng";  
let y = "Isaiah Tshabalala";  
result = commonFunctions.compare(x, y);
console.log(result); // -1 because "Jiāng Fāng" is before "Isaiah Tshabalala" in ascending order.
result = commonFunctions.compare(x, y, 'desc');
console.log(result); // 1 because "Jiāng Fāng" is after "Isaiah Tshabalala" in descending order.

result = commonFunctions.compare(y, x);
console.log(result); // 1 because "Isaiah Tshabalala" is after "Jiāng Fāng" in ascending order.
console.log("----END OF compare test----");

let teamsArray = [
                    { score: 90, numGames: 10 },
                    { score: 90, numGames: 12 },
                    { score: 85, numGames: 8 },
                    { score: 85, numGames: 10 }
                ]; // Sorted by "score desc", "numGames asc".

let searchObj = { score: 85, numGames: 8 };
let anIndex = (commonFunctions.binarySearchObj(teamsArray, searchObj, 0, "score desc", "numGames asc"));

console.log(commonFunctions.objCompare(searchObj, teamsArray[anIndex], "score desc", "numGames asc")); // 0 found
console.log("----END OF binarySearchObj test----");  

teamsArray = [
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

let noDuplicatesArray = commonFunctions.getObjArrayWithNoDuplicates(teamsArray, true, "score desc", "numGames asc");  
console.log(noDuplicatesArray); // Should contain only unique objects according to comparison fields.
console.log("----END OF getObjArrayWithNoDuplicates test----");