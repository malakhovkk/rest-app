import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './PopUpCreate.module.css';
import {clients} from '../api/clients';
import {add_access} from '../api/add_access';
import { useNavigate } from 'react-router-dom';

export default function Add({setPopUpAdd, setResult, id}) {
    let navigate = useNavigate();
    const [info, setInfo] = useState({
        
    });
    
    async function edit_client(e)
    {
        e.preventDefault();
        let data = await add_access(info, id);
        setPopUpAdd(false);
        let res =  await clients();
        setResult(res);
        if(res.error)
        {
                navigate("../login", { replace: true });
        }
        console.log(data);
    }
    let arr = ['orig_name', 'access_id','pwd', 'info','prop'];
    return (
        <div class={styles.container}>
      <form onSubmit={(e) => edit_client(e)} className={styles.forma}>
      {arr.map(el =>  <TextField  id="standard-basic" label={el} variant="standard"  value={info[el]} onChange={(e) => setInfo({...info, [el]:e.target.value})} type="text"/>)}
       {console.log(arr)}
    
        
          <Button type="submit" className={styles.submit1} variant="contained">Сохранить</Button>
          <Button onClick={() => setPopUpAdd(false)} variant="contained" color="error">
    Отменить
    </Button>
      </form>
      </div>
    );
  }