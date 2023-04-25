import axios from "axios"

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, data)
    return res.data
}

export const registerUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, data)
    return res.data
}

export const getDetailUser = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get-user/${id}`)
    return res.data
}

export const getView = async (slug) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get-view/${slug}`)
    return res.data
}

export const updateUser = async (p) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/update-info/${p.id}`,p.data)
    return res.data
}

export const updateUserExp = async (p) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/update-info-array/${p.id}`,p.data)
    return res.data
}

export const updateUserSkill = async (p) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/update-info-skill/${p.idUser}`,p.data)
    return res.data
}


export const removeUserExp = async (p) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/remove-info-array/${p.idUser}`,p.data)
    return res.data
}