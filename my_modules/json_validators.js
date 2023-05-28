const validator = require('jsonschema').Validator;
const advertCategories_PL = require("../enums/advert_categories");
const deliveryMethods_PL = require("../enums/delivery_methods");
const paymentMethods_PL = require("../enums/payment_methods");

const AdvertJsonValidate = function(jsonToValidate){
    const allowedCategories = Object.values(advertCategories_PL);
    const alloweddeliveryMethods = Object.values(deliveryMethods_PL);
    const allowedpaymentMethods = Object.values(paymentMethods_PL);
    const newAdvertJsonSchema = {
        "id":"/advert",
        "type":"object",
        "properties": {
            "title": {"type": "string", "required": true, "minLength": 1},
            "body": {"type": "string", "required": true, "minLength": 1, "maxLength": 2000},
            "userId": {"type": "string", "required": true, "minLength": 1},
            "category": {"enum": allowedCategories, "required": true},
            "price": {"type": "number", "required": true, "minimum": 0},
            "tags": { "type": "array", "items": {"type": "string", "minLength": 1}, "required": true, "minItems": 1},
            "deliveryMethods": {"type": "array", "items": {"enum": alloweddeliveryMethods}, "required": true, "minItems": 1},
            "paymentMethods": {"type": "array", "items": {"enum": allowedpaymentMethods}, "required": true, "minItems": 1}
        },
        "additionalProperties": false
    };
    const v = new validator();
    const result = v.validate(jsonToValidate, newAdvertJsonSchema);
    return [result.valid, result.errors];

};

module.exports = {AdvertJsonValidate};


