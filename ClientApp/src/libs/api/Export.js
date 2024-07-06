import API from "./API";

var Export = {
    async AllLedgers() {
        var result = await API.process(
            'api/Export/Ledgers',
            'GET',
            null
        ).catch((err) => {
            throw err;
        })

        return result
    },

}

export default Export;