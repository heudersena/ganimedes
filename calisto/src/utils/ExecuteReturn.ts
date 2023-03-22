


export const ExecuteReturn = (data: any, error = false, errorMessage: any = "") => {

    return {
        data,
        error,
        errorMessage
    }

}