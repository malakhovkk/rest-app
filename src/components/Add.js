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
        type_id: "tRexMQ"
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
       
    }
    let arr = ['orig_name', 'access_id','pwd', 'info','prop'];
    return (
        <div class={styles.container}>
      <form onSubmit={(e) => edit_client(e)} className={styles.forma}>
      <select value={info.type_id} onChange={(e) => setInfo({...info, type_id:e.target.value})}>
            <option value="tRexMQ">tRexMQ</option>
            <option value="tConfig">tConfig</option>
            <option value="tDevice">tDevice</option>
            <option value="tAdmin">tAdmin</option>
          </select>
      {arr.map(el =>  <TextField style={{width:"300px"}} id="standard-basic" label={el} variant="standard"  value={info[el]} onChange={(e) => setInfo({...info, [el]:e.target.value})} type="text"/>)}
       
    
        
          <Button type="submit" style={{marginTop:"40px",marginBottom:"20px" }}   className={styles.submit1} variant="contained">Сохранить</Button>
          <Button onClick={() => setPopUpAdd(false)} variant="contained" color="error">
    Отменить
    </Button>
      </form>
      </div>
    );
  }