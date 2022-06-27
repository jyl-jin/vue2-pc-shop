import {v4 as uuidv4} from 'uuid'
export const getUuid=()=>{
    // 首先判断有没有，没有就生成并存储
    let uuid_token=localStorage.getItem('UUID_TOKEN')
    if(!uuid_token){
        // 如果没有的话，生成并且存储
        uuid_token=uuidv4()
        localStorage.setItem('UUID_TOKEN',uuid_token)
    }
    return uuid_token
}