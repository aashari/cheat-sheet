/**
 * This function takes a nested object and flattens it into a single level object.
 * 
 * @param {object} data 
 * @param {boolean} lowerCase 
 * @param {string} prefix 
 * @returns 
 */
const nestedObjectFlattening = (data, lowerCase = false, prefix = '', separator = '.') => {

    // if obj is an array, iterate over each item and recursively call nestedObjectFlattening
    if (Array.isArray(data)) return data.map(item => nestedObjectFlattening(item, lowerCase, prefix, separator));

    // if obj is a date, return the date
    if (data instanceof Date) return data;

    // if obj is a number or boolean, return the value
    if (typeof data === 'number' || typeof data === 'boolean') return data;

    // if obj is undefined or empty string or null, return undefined
    if (data === undefined || data === '' || data === null) return undefined;

    // if obj is just a regular string, return the value
    if (typeof data === 'string') return data;

    // otherwise, create new object
    let result = {};

    // iterate over each key in the object
    for (let attribute in data) {

        // generate new key
        let newKey = `${prefix}${attribute}`;

        // if the key should be lowercased, do so
        if (lowerCase) newKey = newKey.toLowerCase();

        // if the value is not an object or is an array
        if (typeof data[attribute] !== 'object' || Array.isArray(data[attribute])) {
            result[newKey] = nestedObjectFlattening(data[attribute], lowerCase, prefix, separator);
            continue;
        }

        // otherwise, recursively call objectFlattening
        const flattenedObject = nestedObjectFlattening(data[attribute], lowerCase, `${newKey}${separator}`, separator);
        result = { ...result, ...flattenedObject };

    }

    // return the flattenedObject but clean it first
    return JSON.parse(JSON.stringify(result));

}

module.exports = { nestedObjectFlattening };
