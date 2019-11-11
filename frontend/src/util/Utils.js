export default class Utils {
    static validateEmail(email) {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return mailformat.test(email);
    }

    static validateSignupForm(firstname, lastname, email, pwd, confirmPwd) {
        // check email format, verify confirmPassword
        let validated = true;
        let errorMsg = "";
        if (!firstname || !lastname || !email || !pwd || !confirmPwd) {
            validated = false;
            errorMsg = "Please fill in all fields!";
        } else {
            if (this.validateEmail(email)) {
                if (pwd !== confirmPwd) {
                    validated = false;
                    errorMsg = "Your passwords don't match!";
                }
            } else {
                validated = false;
                errorMsg = "You have entered an invalid email address!";
            }
        }
        return {
            validated: validated,
            errorMsg: errorMsg
        }
    }

    static validateLoginForm(email, pwd) {
        let validated = true;
        let errorMsg = "";
        if (!email || !pwd) {
            validated = false;
            errorMsg = "Please fill in all fields!";
        } else {
            if (!this.validateEmail(email)) {
                validated = false;
                errorMsg = "You have entered an invalid email address!";
            }
        }
        return {
            validated: validated,
            errorMsg: errorMsg
        }
    }

    static getAccountIdFromLocalStorage() {
        const accountInStorage = localStorage.account && JSON.parse(localStorage.account);
        return accountInStorage && accountInStorage.id;
    }
};