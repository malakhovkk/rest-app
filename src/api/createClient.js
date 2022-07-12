
import axios from 'axios'

async function createClient(props)
{
    let token = null;
    console.log(props);
    try{
        const {data} = await axios({
            method: 'put',
        // url: 'https://81.94.140.200:8081/api/login',
            url:'https://www.re-check.com:8081/api/v1/client',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization' : 'bearer ' + localStorage.getItem('token')
            },
            data: props
            
        });
        return data;
    }
    catch(err)
    {
        console.log(err);
    }
    
}
export {createClient}