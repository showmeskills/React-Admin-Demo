import axios from 'axios';


const isDev = process.env.NODE_ENV === 'development';

const service = axios.create({
    baseURL:isDev? 'http://rap2api.taobao.org/app/mock/280244':''
})

service.interceptors.request.use(config=>{
    config.data = Object.assign({},config.data,{authToken:'itisatokenplaceholder'})
    return config
})

service.interceptors.response.use(resp=>{
    //console.log(resp)
    // if(resp.data.status === 200){
    //     return resp.data
    // }else{
    //     //全局处理错误
    //     return message.error(resp.data.errMsg)
        
    // }
    return resp.data
})


//offset 和 limited 自定变量添加分页数量
export const getArtilces = (offset = 0,limited=10)=>{
    return service.post('/api/v1/articleList',{
        offset,
        limited
    })
}
//delete artilce throught id
export const delArtById = (id)=>{
    return service.delete(`/api/v1/article/delete/${id}`)
}