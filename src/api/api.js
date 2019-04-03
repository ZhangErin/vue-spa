import axios from 'axios';

axios.defaults.withCredentials = true


//  let base = '';
 //let base = process.env.NODE_ENV ==='production'?'https://www.awebide.com:7001':''
let base = process.env.NODE_ENV === 'production' ? 'https://localhost:7008' : ''

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getRoutersList = params => { return axios.get(`${base}/-/router/get`, { params: params }); };

export const getUserList = params => { return axios.get(`${base}/-/user/list`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/-/user/remove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/-/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/-/user/add`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/-/user/listpage`, { params: params }); };
