# Change log

## Version 1.0.0 - 2025/11/19 - ITA
Genesis.

## Version 1.0.1 - 2025/11/19 - ITA
Improve README.md documentation.

## Version 1.0.2 - 2025/11/20 - ITA
- Improve README.md documentation and move documentation of changes to CHANGELOG.md
- Move more previously tested and used utility functions to this package. These are:
  - compare(value1, value2, sortDir = 'asc')  
  - binarySearch(anArray, searchVal, startFrom = 0, arraySortDir = 'asc')
  - objCompare(obj1, obj2, ...comparisonFields)
  - binarySearchObj(objArray, searchObj, startFrom, ...sortFields)
  - getObjArrayWithNoDuplicates(objArray, firstOfDuplicates, ...comparisonFields)
- Add the "lodash" dependency used by some of these newly added functions.

## Version 1.0.4 - 2025/11/20 - ITA
- Improved the readability of README.me

## Version 1.0.5 - 2025/11/21 - ITA
- Corrected README documentation.

## Version 1.0.6 - 2025/11/21 - ITA
- Updated package.json version in lieu of changes. Otherwise the updated package won't be published on npm.
## Version 1.0.7 - 2025/11/21 - ITA
- Corrected README documentation.

## Version 1.0.8 - 2025/11/21 - ITA
- Corrected test code and README documentation.

## Version 1.0.9 - 2025/11/28 - ITA
- Provided more documentation in test.js to remind a developer how to symbolic-link (mimick as installed) the package and running the test code.
- Added new function, hasOnlyAll(), and updated the README.md documentation accordingly.
  
## Version 1.1.0 - 2025/12/22 - ITA
- Improved documentation.
- Moved in more functions to the package: `deepClone(anObject)`, `getSortedObject(anObject)`, `timeStampYyyyMmDd(dateInstance)` and `timeStampString(dateInstance)`.
  
## Version 1.1.1 - 2025/12/26 - ITA
- Removed lodash dependency and re-implemented the get() and set() object functions, reducing package size.
- Re-implemented the getSortedObj() function to no longer use the get() object function.
- Improved the duplicate removal process in getArrayWithNoDuplicates() function, so as to be more reliable across all cases. Implemented the new getNextDifferentObject() function in the light of that.

## Version 1.1.2 - 2025/12/26 - ITA
Corrected a minor error in the README documentation.
