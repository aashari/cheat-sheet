const { nestedObjectFlattening } = require('./nested-object-flattening');

const result = nestedObjectFlattening({
    "data": {
        "info": {
            "account_id": "1234567890",
            "environment": "staging",
            "region": "ap-southeast-3",
            "stack_name": "service-xyzabc",
            "service_name": "xyzabc",
            "type": "log.aws.billing.cost-usage-report"
        },
        "data": {
            "id": "fe6b7422d4188dc3f61ab8b565452982",
            "type": "cost-usage-report",
            "timestamp": "2022-08-08T04:00:00.000Z",
            "record": {
                "identity_time_interval": "2022-08-08T03:00:00Z/2022-08-08T04:00:00Z",
                "bill_invoicing_entity": "Amazon Web Services Singapore Private Limited",
            }
        }
    },
    "error": {
        "type": "circuit_breaking_exception",
        "reason": "[parent] Data too large, data for [indices:data/write/bulk[s]] would be [4133016152/3.8gb], which is larger than the limit of [3978238361/3.7gb], real usage: [4130339000/3.8gb], new bytes reserved: [2677152/2.5mb], usages [request=7729112/7.3mb, fielddata=7187220/6.8mb, in_flight_requests=4550214/4.3mb, accounting=48822868/46.5mb]",
        "bytes_wanted": 4133016152,
        "bytes_limit": 3978238361,
        "durability": "PERMANENT"
    }
});

console.debug(result)