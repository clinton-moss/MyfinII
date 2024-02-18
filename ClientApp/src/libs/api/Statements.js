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
}

export default Statements;