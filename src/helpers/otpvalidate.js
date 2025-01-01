async function oneMinuteExpiry(otpTime) {
    try {
        console.log("OTP Time: ", otpTime);
        const c_datetime = new Date();
        var differencevalue = ( otpTime -c_datetime.getTime())/1000 ; // Difference in minutes
        differencevalue /=60
        console.log("Difference: ", Math.abs(differencevalue));
        if (Math.abs(differencevalue) > 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function fiveMinuteExpiry(otpTime) {
    try {
        console.log("OTP Time: ", otpTime);
        const c_datetime = Date.now();
        const differencevalue = (c_datetime - otpTime) / 1000 / 60; // Difference in minutes
        console.log("Difference: ", differencevalue);
        if (differencevalue > 5) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { oneMinuteExpiry, fiveMinuteExpiry };