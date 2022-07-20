
import axios from 'axios'

async function login(name, password)
{
    //let token = null;
    try{
        const {data} = await axios({
            method: 'post',
        // url: 'https://81.94.140.200:8081/api/login',
            url:'https://www.re-check.com:8081/api/login',
            headers: {
                'Accept': 'application/json',
                'jwtusername': name,
                'jwtpassword': password
            }
            
        });
        console.log(data.token);
        return data.token;
    }
    catch(err)
    {
        return  {error:err};
    }
    
}
export {login}