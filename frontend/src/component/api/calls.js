import axios from 'axios';
import API_ROUTE from '../../const/param';

export function register(data, callback, errorcallback){
  axios.post(`${API_ROUTE}register/`, 
  {
      "username" : data.username,
      "password" : data.password,
      "email": data.email,
  }
  )
  .then(response => {
    //do something
    if(response.status === 201){
      console.log(response.data)
      callback(response.data);
    }
  })
  .catch(err => {
    // catch error
    console.log("error : " + err.response.data.error)
    errorcallback(err.response.data.error)
  })
}


export function login(data, callback, errorcallback){
  axios.post(`${API_ROUTE}login/`, 
  {
      "username" : data.username,
      "password" : data.password,
  }
  )
  .then(response => {
    //do something
    console.log(response)
    if(response.status === 200){
      console.log(response.data)
      callback(response.data);
      localStorage.setItem('authUser',  JSON.stringify(response.data));
    }
  })
  .catch(err => {
    // catch error
    console.log("error : " + err.response.data.error)
    errorcallback(err.response.data.error)
  })
}

export function updateUserMail(data, callback, errorcallback){
  axios.put(`${API_ROUTE}update/user/${data.user_id}`, 
  {
      "email" : data.username,
  },
  { "Authorization" : `Token ${ localStorage.getItem("token")}` }
  )
  .then(response => {
    //do something
    console.log(response)
    if(response.status === 200){
      console.log(response.data)
      callback(response.data);
      localStorage.setItem('authUser',  JSON.stringify(response.data));
    }
  })
  .catch(err => {
    // catch error
    console.log("error : " + err.response.data.error)
    errorcallback(err.response.data.error)
  })
}