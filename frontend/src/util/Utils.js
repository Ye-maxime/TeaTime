export default class Utils {
    static getAccountIdFromLocalStorage() {
        const accountInStorage = localStorage.account && JSON.parse(localStorage.account);
        return accountInStorage && accountInStorage.id;
    }

    static formatOrderDate(dateInString) {
        const dates = dateInString.split('T');
        const date = dates[0];
        const time = dates[1] && dates[1].split('.')[0];
        return time ? date + ' ' + time : date;
    }

    static isAuthenticated() {
        return !!this.getAccountIdFromLocalStorage();
    }
};