const Joi = require("joi")
const validator = (schema) => (data) => 
    schema.validate(data, {abortEarly: false})

const postUpdateSchema = Joi.object({
    id: Joi.number().required(),
    Name: Joi.string().required(),
    Price: Joi.string().required(),
    model: Joi.string().required(),
    bodytype: Joi.string().required(),
    range: Joi.string().required(),
    chargingtime: Joi.string().required(),
    safetyfeatures: Joi.string().required(),
    batterycapacity:Joi.string().required()
})

const updateAndPostValidator = validator(postUpdateSchema)
module.exports = updateAndPostValidator