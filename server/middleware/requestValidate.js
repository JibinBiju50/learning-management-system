//generic validator: recives a joi or schema and return the middleware
export const validate = (schema)=> (req, res, next) => {
const {error} = schema.validate(req.body, {abortEarly: false});

if(error){
    //collect all the errors and sent it to client
    const messages = error.details.map(e => e.message);
    return res.status(401).json({errors: messages});
}
//move to next middleware
next();
}
