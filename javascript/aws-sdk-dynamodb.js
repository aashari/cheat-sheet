const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB.DocumentClient();

const getItem = async (tableName, params) => {
    return dynamodb.get({
        TableName: tableName,
        Key: params
    }).promise().catch((error) => {
        console.error(`[aws-sdk-dynamodb][getItem] error ${error}`, { tableName, params, error });
        return undefined;
    }).then((data) => {
        if (data && data.Item) return data.Item;
        return undefined;
    })
}

const putItem = async (tableName, params) => {
    return dynamodb.put({
        TableName: tableName,
        Item: params
    }).promise().catch((error) => {
        console.error(`[aws-sdk-dynamodb][putItem] error ${error}`, { tableName, params, error });
        return undefined;
    }).then((data) => {
        if (data) return data;
        return undefined;
    })
}

const scanItem = async (tableName, params) => {
    return dynamodb.scan({
        TableName: tableName,
        ...params
    }).promise().catch((error) => {
        console.error(`[aws-sdk-dynamodb][scanItem] error ${error}`, { tableName, params, error });
        return undefined;
    }).then((data) => {
        if (data && data.Items) return data.Items;
        return undefined;
    })
}

module.exports = { getItem, putItem, scanItem };