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

    static createRequestOptions(method = 'GET', payload = '', needAuthorization = false) {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        if (needAuthorization) {
            headers.append('Authorization', `Bearer ${localStorage.token}`);
        }

        const options = {
            method,
            headers
        };

        if (method === 'POST') {
            options.body = JSON.stringify(payload);
        }

        return options;
    }
};