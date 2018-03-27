const FormValidator = {
    //This is an object and its items are arrays
    //validators: {[array1],[array2],[array3],...}
    validators: {},

    addValidator(validatorName, validatorFunction) {
        // spara undan en validator funktion med med ett givet namn.
        if (!this.validators[validatorName])
            this.validators[validatorName] = [];

        this.validators[validatorName].push(validatorFunction);
    },

    prepare(mapping) {
        // spara undan ett mappningsobjekt mellan formulärfält och deras validators.
        this.validatorsMapping = mapping;
    },

    validate(data) {
        // för varje property (= formulärfält) i dataobjektet 
        //  hämta ut motsvarande validator för property:n m.h.a mappningsobjektet och applicera den på property:ns 
        //   värde (= formulärdata)
        //  om validatorn returnerar false, skapa och lägg till ett felmeddelande i en lista. Felmeddelandet ska 
        //   innehålla namnet på property:n.
        //
        // returnera listan av felmeddelanden.

        let validationResult = [];

        //Get VALIDATORS mapping
        let validatorsMapping = this.validatorsMapping;

        //Do not use data mapping
        console.log("Begin process in validate() function...");
        validatorsMapping.forEach((item,key)=>{
            let itemValue = document.getElementById(key).value;
            if (this.assignToValidator(item,itemValue))
                console.log(true,key,itemValue,item); //Testing purpose (true,elementId,elementValue,validatorName)
            else{
                console.log(false,key,itemValue,item); //Testing purpose
                //validationResult += `<p>${data.get(key)} is not valid</p>`;//Create error messages
                let objResult = {
                    validator: item,
                    elementId: key,
                    elementName: data.get(key)
                };
                validationResult.push(objResult);
            }
        });

        return validationResult
    },

    getValidators(){
        //Get all current validator's names which added by method addValidator()
        const validatorNames = [];
        for (let validatorName in this.validators)
            validatorNames.push(validatorName);
        return validatorNames;
    },

    assignToValidator(validatorName, validatorData){
        const currentData = this.validators[validatorName];
        let result = false;
        currentData.forEach(assignData => {
            result = assignData(validatorData);
        });
        return result
    }
};


