import axios from 'axios'
import API from '../constants/apiEndPoints'

const createOptions = (token) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }
}

export function Signup(payload){
  return new Promise(async(resovle, reject) => {
    const result = {
      response: {},
      error: ''
    }
    try{
      const res = await axios.post(API.REGISTER, payload)
      result.response = res.data
      resovle(result)
    }
    catch(error){
      result.error = error
      resovle(result)
    }
  })
}

export function Signin(payload){
  return new Promise(async(resovle, reject) => {
    const result = {
      response: {},
      error: ''
    }
    try{
      const res = await axios.post(API.LOGIN, payload)
      result.response = res.data
      resovle(result)
    }
    catch(error){
      result.error = error
      resovle(result)
    }
  })
}

export function getAuthUser(){
  return new Promise(async(resovle, reject) => {
    const result = {
      response: {},
      error: ''
    }
    try{
      const res = await axios.get(API.GET_AUTH_USER)
      result.response = res.data
      resovle(result)
    }
    catch(error){
      result.error = error
      resovle(result)
    }
  })
}

export function getDoctorsListById(token,id){
  return new Promise(async(resovle, reject) => {
    const result = {
      response: {},
      error: ''
    }
    try{
      const options = createOptions(token); 
      const res = await axios.get('/doctors/doctor-detail/'+id,options)
      result.response = res.data
      resovle(result)
    }
    catch(error){
      result.error = error
      resovle(result)
    }
  })
}

export function updateDoctorList(payload,token,id){
  return new Promise(async(resovle, reject) => {
    const result = {
      response: {},
      error: ''
    }
    try{
      const options = createOptions(token); 
      const res = await axios.put('/doctors/update-doctor-profile-by-admin/'+id,payload,options)
      result.response = res.data
      resovle(result)
    }
    catch(error){
      result.error = error
      resovle(result)
    }
  })
}

export function getPatientsList(token){
  return new Promise(async(resovle, reject) => {
    const result = {
      response: {},
      error: ''
    }
    try{
      const options = createOptions(token); 
      const res = await axios.get(API.GET_PATIENTS_LIST,options)
      result.response = res.data
      resovle(result)
    }
    catch(error){
      result.error = error
      resovle(result)
    }
  })
}

export function getPatientDetails(token,id){
  return new Promise(async(resovle, reject) => {
    const result = {
      response: {},
      error: ''
    }
    try{
      const options = createOptions(token); 
      const res = await axios.get('/patient/'+id,options)
      result.response = res.data
      resovle(result)
    }
    catch(error){
      result.error = error
      resovle(result)
    }
  })
}

export function updatePatientList(payload,token,id){
  return new Promise(async(resovle, reject) => {
    const result = {
      response: {},
      error: ''
    }
    try{
      const options = createOptions(token); 
      const res = await axios.put('/patient/update-patient-profile-by-admin/'+id,payload,options)
      result.response = res.data
      resovle(result)
    }
    catch(error){
      result.error = error
      resovle(result)
    }
  })
}

export function getInterestsList(token){
  return new Promise(async(resovle, reject) => {
    const result = {
      response: {},
      error: ''
    }
    try{
      const options = createOptions(token); 
      const res = await axios.get(API.GET_INTERESTS_LIST,options)
      result.response = res.data
      resovle(result)
    }
    catch(error){
      result.error = error
      resovle(result)
    }
  })
}

export function addInterestsList(payload,token){
  return new Promise(async(resovle, reject) => {
    const result = {
      response: {},
      error: ''
    }
    try{
      const options = createOptions(token); 
      const res = await axios.post(API.GET_INTERESTS_LIST, payload,options)
      result.response = res.data
      resovle(result)
    }
    catch(error){
      result.error = error
      resovle(result)
    }
  })
}
