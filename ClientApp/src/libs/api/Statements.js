import API from "./API";

var Statements = {
    async ProcessStatementFile(UploadFile) {
        var result = await API.process(
            'api/Statement/Upload',
            'POST',
            UploadFile
        ).catch((err) => {
            throw err;
        })

        return result
    },
    async ProcessStatementEntries(ledger) {
        var result = await API.process(
            'api/Statement/Entries',
            'POST',
            ledger
        ).catch((err) => {
            throw err;
        })

        return result
    },
}

export default Statements;