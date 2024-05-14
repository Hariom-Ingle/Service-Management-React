// validate-middleware.js

const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status=422;
        const message = "fill the input propely "
        const extraDetails=  err.errors[0].message
        // res.status(400).json({ msg:message });
        
        const error={
            status,
            message,
            extraDetails,
        };
        
        console.log(error)
        next(error)
    }
};

module.exports = validate;
