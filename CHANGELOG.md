# Change log

## Version 1.00 - 2025/11/19 - ITA
Genesis.

## Version 1.01 - 2025/11/19 - ITA
Improve README.md documentation.

## Version 1.02 - 2025/11/20 - ITA
- Improve README.md documentation and move documentation of changes to CHANGELOG.md
- Move more previously tested and used utility functions to this package. These are:
  - compare(value1, value2, sortDir = 'asc')  
  - binarySearch(anArray, searchVal, startFrom = 0, arraySortDir = 'asc')
  - objCompare(obj1, obj2, ...comparisonFields)
  - binarySearchObj(objArray, searchObj, startFrom, ...sortFields)
  - getObjArrayWithNoDuplicates(objArray, firstOfDuplicates, ...comparisonFields)
- Add the "lodash" dependency used by some of these newly added functions.

