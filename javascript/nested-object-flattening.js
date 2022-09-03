/**
 * This function takes a nested object and flattens it into a single level object.
 * 
 * @param {object} obj 
 * @param {boolean} lowerCaseTheKey 
 * @param {string} prefix 
 * @returns 
 */
const nestedObjectFlattening = (obj, lowerCaseTheKey = false, prefix = '') => {

    // if obj is empty
    if (!obj) return undefined;

    // if obj is an array, iterate over each item and recursively call nestedObjectFlattening
    if (Array.isArray(obj)) return obj.map(item => nestedObjectFlattening(item, lowerCaseTheKey, prefix));

    // if obj is a date, return the date
    if (obj instanceof Date) return obj;

    // if obj is a number or boolean, return the value
    if (typeof obj === 'number' || typeof obj === 'boolean') return obj;

    // if obj is just a regular string, return the value
    if (typeof obj === 'string') return obj;

    // otherwise, create new object
    let flattenedObject = {};

    // iterate over each key in the object
    for (let key in obj) {
        // generate new key
        let newKey = `${prefix}${key}`;
        // if the key should be lowercased, do so
        if (lowerCaseTheKey) newKey = newKey.toLowerCase();
        // if value is an array, pass the value to nestedObjectFlattening
        if (Array.isArray(obj[key])) {
            flattenedObject[newKey] = nestedObjectFlattening(obj[key], lowerCaseTheKey, prefix);
            continue;
        }
        // if the value is an object, recursively call nestedObjectFlattening
        if (typeof obj[key] === 'object') {
            flattenedObject = { ...flattenedObject, ...nestedObjectFlattening(obj[key], lowerCaseTheKey, `${prefix}${key}.`) };
            continue;
        }
        // otherwise return as it is
        flattenedObject[newKey] = nestedObjectFlattening(obj[key], lowerCaseTheKey, prefix);
    }

    // return the flattenedObject but clean it first
    return flattenedObject;

}

module.exports = { nestedObjectFlattening };
