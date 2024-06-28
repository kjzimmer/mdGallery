import axios from 'axios'


const API_INSTANCE = axios.create({
    baseURL: 'http://localhost:8010/api/paintings'
})

API_INSTANCE.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const paintingServices = {

    upload: async (formData) => {
        try{
            const res = await API_INSTANCE.post('/upload', formData)
        } catch(error){ throw error }
    },

    create: async (painting) => {
        try{
            // console.log('add painting: ', painting)
            const res = await API_INSTANCE.post('/', painting)
        } catch(error){ throw error }
    },
    
    get: async (id) => {
        try{
            if(id){
                const res = await API_INSTANCE.get(`/${id}`)
                return res.data
            }else{
                const res = await API_INSTANCE.get(`/`)
                // console.log('paintings: ', res.data)
                return res.data
            }
        } catch(error){ 
            error.response.data?.msg ==='session expired' && (window.location = '/')
            throw error
        }
    },

    update: async (painting) => {
        try{
            const res = await API_INSTANCE.put('/', painting)
        } catch(error){ throw error }
    }
}

