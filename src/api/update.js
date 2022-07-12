
import axios from 'axios'

// function convertId(id)
// {
//     let res = '';
//     for(let i = 1; i + 1 < id.length; i++ ) res += id.charAt(i);
//     return res;
// }

async function update(props)
{
    let token = null;
    console.log(props);
    let id = props.id;
    // id = convertId(id);
    try{
        const {data} = await axios({
            method: 'post',
        // url: 'https://81.94.140.200:8081/api/login',
            url:`https://www.re-check.com:8081/api/v1/client/${id}`,
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
export {update}