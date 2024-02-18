import API from "./API";

var Accounts = {
    async CreateAccount(Account) {
        var result = await API.process(
            'api/Accounts',
            'POST',
            Account
        ).catch((err) => {
            throw err;
        })

        return result
    },
    async ListAccounts() {
        var result = await API.process(
            'api/Accounts',
            'GET',
            null
        ).catch((err) => {
            throw err;
        })

        return result
    },
    async RemoveAccount(id) {
        var result = await API.process(
            `api/Accounts/${id}`,
            'DELETE',
            null
        ).catch((err) => {
            throw err;
        })

        return result
    },
    async GetAccount(id) {
        var result = await API.process(
            `api/Accounts/${id}`,
            'GET',
            null
        ).catch((err) => {
            throw err;
        })

        return result
    },
    async ListRunningLedger(account) {
        var result = await API.process(
            `api/Accounts/Account/${account}/Ledger`,
            'GET',
            null
        ).catch((err) => {
            throw err;
        })

        return result
    },
}

export default Accounts;