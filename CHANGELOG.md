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

## Version 1.05 - 2025/11/21 - ITA
- Corrected README documentation.

## Version 1.06 - 2025/11/21 - ITA
- Updated package.json version in lieu of changes. Otherwise the updated package won't be published on npm.
