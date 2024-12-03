import axios from "axios";

const axiosIns = axios.create({
    baseURL: "https://mern-crud-rest-api.onrender.com"
})


const UserApi = {
    readAll: async () => {
        return axiosIns.request({
            method: "GET",
            url: `/api/user/all`
        })
    },
    readSingle: async (id) => {
        return axiosIns.request({
            method: "GET",
            url: `/api/user/single/${id}`
        })
    },
    create: async (user) => {
        return axiosIns.request({
            method: "POST",
            url: `/api/user/add`,
            data: user
        })
    },
    update: async ({ id, user }) => {
        return axiosIns.request({
            method: "PATCH",
            url: `/api/user/update/${id}`,
            data: user
        })
    },
    delete: async (id) => {
        return axiosIns.request({
            method: "DELETE",
            url: `/api/user/delete/${id}`
        })
    }
}

export default UserApi