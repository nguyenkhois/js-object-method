//App.js
$(document).ready(function(){
    //CREATE VALIDATORS into an object - validators:{} and predefine the functions for these validators. We have 2 arguments for every validator input)
    FormValidator.addValidator('isNumberBiggerThan0',(validatorCurrentValue) => {
        return (parseInt(validatorCurrentValue) > 0);
    });
    FormValidator.addValidator('isNumber0OrBiggerThan0',(validatorCurrentValue) => {
        return (parseInt(validatorCurrentValue) >= 0);
    });
    FormValidator.addValidator('isStringNotNull',(validatorCurrentValue) => {
        return (validatorCurrentValue.trim() !== "")
    });

    //Check status - Testing purpose
    const currentValidators = FormValidator.getValidators() || [];
    console.log("Current validators",currentValidators); //get all current validator names

    //Create validator mapping
    //(HTML elementId - VALIDATOR)
    const mapping = new Map();
    mapping.set('productId','isNumber0OrBiggerThan0');
    mapping.set('productName','isStringNotNull');
    mapping.set('productPrice','isNumberBiggerThan0');
    mapping.set('stockStatus','isStringNotNull');
    FormValidator.prepare(mapping);

    //Create data mapping
    //(HTML elementId - Element name)
    const data = new Map();
    data.set('productId','Product Id');
    data.set('productName','Product name');
    data.set('productPrice','Product price');
    data.set('stockStatus','Stock status');

    //MAIN
    let dspMessage = $("#dspMessage");
    let btnAddProduct = $("#btnAddProduct");
    btnAddProduct.click(function () {
        dspMessage.html("");//Clear all data before validation

        let error = FormValidator.validate(data);
        if (error.length > 0){
            error.forEach(objError=>{
                console.log(objError.elementName);
                dspMessage.append("<p>" + objError.elementName + " is not valid</p>");
            });
            dspMessage.attr("style","color:red");
        }else
            dspMessage.html("Everything is ok now!").attr("style","color:green");
    });
});