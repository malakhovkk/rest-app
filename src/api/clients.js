
import axios from 'axios'

async function clients()
{
    try{
        const {data} = await axios({
            method: 'get',
        // url: 'https://81.94.140.200:8081/api/login',
            url:'https://www.re-check.com:8081/api/v1/clients',
            headers: {
                'Accept': 'application/json',
                'Authorization' : 'bearer ' + localStorage.getItem('token')
            }
            
        });
        return data;
    }
    catch(err)
    {
        return  {error:err};
    }
}
export {clients}

