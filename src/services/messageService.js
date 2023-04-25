import axios from "axios"

export const getMessage = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/message/my-message/${data.id}?limit=10&filter=${data.filter}`)
    return res.data
}

export const updateMessage = async (data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/message/update-message/${data?.id}`,data?.data)
    return res.data
}

export const send = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/message/send`,data)
    return res.data
}