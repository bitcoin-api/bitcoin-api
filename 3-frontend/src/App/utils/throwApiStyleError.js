export default ({
    
    message,

}) => {
 
    const error = new Error( message );
    error.response = {
        data: {
            message,
        }
    };
    throw error;
};
