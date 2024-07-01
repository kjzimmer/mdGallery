import axios from 'axios'


const API_INSTANCE = axios.create({
    baseURL: 'http://localhost:8010/api'
})

API_INSTANCE.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const userServices = {
    login: async (credentials) => {
        try{
            const res = await API_INSTANCE.post('/login', credentials)
            localStorage.setItem('userToken', res.data.token)
            window.location = '/admin'
        } catch(error){ throw error }
    },
    
    logout: async () => {
        try{
            const res = await API_INSTANCE.post('/logout')
            localStorage.removeItem('userToken')
            window.location = '/login'
        } catch(error){ throw error }
    },
    
    //Create
    register : async (item) => {
        try{
            const res = await API_INSTANCE.post('/register', item)
            localStorage.setItem('userToken', res.data.token)
            window.location = '/admin'
        } catch(error){ throw error }
    },

    sendMessage: async (message) => {
        try{
            const res = await API_INSTANCE.post('/users/contacts', message)
            console.log('sent msg: ', res.data)
            return res.data
        } catch(error){ throw error }
    },

    getContact: async () => {
        try{
            const res = await API_INSTANCE.get('/users/contacts')
            return res.data
        } catch(error){ 
            error.response.data?.msg ==='session expired' && (window.location = '/')
            throw error
        }
    },

    getAll: async () => {
        try{
            const res = await API_INSTANCE.get('/users')
            return res.data
        } catch(error){ 
            error.response.data?.msg ==='session expired' && (window.location = '/')
            throw error
        }
    }
}

