
import axios from 'axios'

// function convertId(id)
// {
//     let res = '';
//     for(let i = 1; i + 1 < id.length; i++ ) res += id.charAt(i);
//     return res;
// }

async function access_all(id)
{
    // id = convertId(id);
    try{
        const {data} = await axios({
            method: 'get',
        // url: 'https://81.94.140.200:8081/api/login',
            url:`https://www.re-check.com:8081/api/v1/access/${id}`,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization' : 'bearer ' + localStorage.getItem('token')
            },
            
        });
        return data;
    }
    catch(err)
    {
        console.log(err);
    }
    
}
export {access_all}