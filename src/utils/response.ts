const createResponse = async (res: any, status: number, message: string, payload: any) => {
    return await res.status(status).json({
        status: status,
        message: message,
        payload: payload
    })

}

export { createResponse }