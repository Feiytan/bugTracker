exports.checkValidKeys = function(keys, validKeys) {
    let returnValue = { result: true, wrongValues: [] }
    keys.forEach(key => {
        if (!validKeys.includes(key)) {
            if (returnValue.result === true) {
                returnValue.result = false
            }
            returnValue.wrongValues.push(key)
        }
    })
    return returnValue
}