$(document).ready(function() {

    $('form').submit(function() {

        removeSuccessMsg()
        removeErroMsg()

        //Forms values
        var bday = new Date($('#bday').val());
        var gender = $('input[name="gender"]:checked').val();
        var nic = $('#nic').val();

        //check the NIC format is correct for old and new NIC
        if (/^[0-9]{9}[vVxX]$/.test(nic) || /^[0-9]{12}$/.test(nic)) {

            //If NIC is old NIC
            if (nic.length == 10) {
                var byear = bday.getFullYear().toString().substring(2, 4)
                var bmonth = bday.getMonth() + 1
                var bday = bday.getDate()
                var nic_year = nic.substring(0, 2);
                var dayList = nic.substring(2, 5)

                //day count
                var dayCount = getDayCount(byear, bmonth, bday, gender)
                console.log(byear + ' ' + bmonth + ' ' + bday + ' ' + nic_year + ' ' + dayList + ' ' + dayCount)


                //Validate the year
                if (checkYear(byear, nic_year)) {

                    // Validate the gender
                    if (checkGender(gender, dayList)) {

                        //Validate the gender
                        if (checkDayCount(dayList, dayCount)) {

                            //If all the validation success display the Success message
                            displaySuccessMsg()

                        } else {

                            displayErrorMsg()

                        }

                    } else {

                        displayErrorMsg()

                    }

                } else {

                    displayErrorMsg()

                }
            }

            //If NIC is new NIC
            if (nic.length == 12) {

                var byear = bday.getFullYear().toString()
                var bmonth = bday.getMonth() + 1
                var bday = bday.getDate()
                var nic_year = nic.substring(0, 4);
                var dayList = nic.substring(4, 7)

                //day count
                var dayCount = getDayCount(byear, bmonth, bday, gender)

                //Validate the year
                if (checkYear(byear, nic_year)) {

                    // Validate the gender
                    if (checkGender(gender, dayList)) {

                        //Validate the gender
                        if (checkDayCount(dayList, dayCount)) {

                            //If all the validation success display the Success message
                            displaySuccessMsg()

                        } else {

                            displayErrorMsg()

                        }

                    } else {

                        displayErrorMsg()

                    }

                } else {

                    displayErrorMsg()

                }

            }


        } else {
            //If NIC didn't match to the formats
            displayErrorMsg()
        }

        return false;

    })

    //To display success message
    function displaySuccessMsg() {
        $('#success').removeClass('d-none')
    }

    //To display error message
    function displayErrorMsg() {
        $('#error').removeClass('d-none')
    }

    //Hide error message
    function removeErroMsg() {
        $('#error').addClass('d-none')
    }

    //Hide success message
    function removeSuccessMsg() {
        $('#success').addClass('d-none')
    }

    //get daycount
    function getDayCount(year, month, day, gender) {

        var dayCount = 0;
        var month = month;
        var day = day;
        if (month == 1) {
            dayCount = day;
        } else if (month == 2) {
            dayCount = 31 + day;
        } else if (month == 3) {
            dayCount = 59 + day;
        } else if (month == 4) {
            dayCount = 90 + day;
        } else if (month == 5) {
            dayCount = 120 + day;
        } else if (month == 6) {
            dayCount = 151 + day;
        } else if (month == 7) {
            dayCount = 181 + day;
        } else if (month == 8) {
            dayCount = 212 + day;
        } else if (month == 9) {
            dayCount = 243 + day;
        } else if (month == 10) {
            dayCount = 273 + day;
        } else if (month == 11) {
            dayCount = 304 + day;
        } else if (month == 12) {
            dayCount = 335 + day;
        }
        if (gender == 'F') {
            dayCount += 500
        }

        if (year % 4 == 0) {
            return dayCount + 1
        } else {
            return dayCount
        }

    }

    //Validate the year with NIC
    function checkYear(byear, nic_year) {

        if (byear != nic_year) {
            return false
        }

        return true

    }


    //Validate the gender with NIC
    function checkGender(gender, dayList) {

        if (gender == 'M') {
            if (!(dayList < 500)) {
                return false
            }
        }
        if (gender == 'F') {
            if (!(dayList > 500)) {
                return false
            }
        }

        return true

    }


    //Validate the dayCount with NIC 
    function checkDayCount(dayList, dayCount) {

        if (dayList != dayCount) {
            return false
        }

        return true

    }
})