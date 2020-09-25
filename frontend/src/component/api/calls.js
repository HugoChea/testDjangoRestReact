import axios from 'axios';
import API_ROUTE from '../../const/param';

export function register(data){
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
        //localStorage.setItem('authUser',  JSON.stringify(response.data.response));
        //localStorage.setItem('token',  response.data.response.token);
        //history.push("/preferences");  
        //window.location.reload(false);
      }
    })
    .catch(err => {
      // catch error
      console.log("error : " + err.response)
    })
}