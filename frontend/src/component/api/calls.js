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
    console.log("error : " + err.response.data.non_field_errors)
    errorcallback(err.response.data.non_field_errors[0])
  })
}

export function updateUserMail(data, callback, errorcallback){
  axios.put(`${API_ROUTE}update/user/${data.id}`, 
  {
      "email" : data.email,
  },
  {headers : { 
    Authorization: `Token ${ data.token}`
  }}
  )
  .then(response => {
    //do something
    console.log(response)
    if(response.status === 200){
      console.log(response.data)
      callback(response.data);
      let user = response.data.user
      user.token = data.token
      localStorage.setItem('authUser',  JSON.stringify(user));
    }
  })
  .catch(err => {
    // catch error
    console.log("error : " + err.response.data.error)
    errorcallback(err.response.data.error)
  })
}