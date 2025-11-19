const commonFunctions = require('common-functions');

let anObject = {
    firstName: "Isaiah",
    lastName: "Tshabalala",
    address: {
        houseNum: "23-B",
        streetName: "Main Road",
        city: "Johannesburg",
        country: {
            name: "South Africa",
            code: "ZA"
        }
    }
};

console.log(commonFunctions.getPaths(anObject));
