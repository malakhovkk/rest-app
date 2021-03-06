import { useState } from "react";
import { update_access } from "../api/update_access";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './PopUpCreate.module.css';
import {access_all} from '../api/access_all';
import { useNavigate } from 'react-router-dom';

export default function Edit({elem, setPopUpEdit, setResult}) {
    let id = localStorage.getItem("id");
    let navigate = useNavigate();
    const [info, setInfo] = useState({
        ...elem
    });
    async function edit_client(e)
    {
        e.preventDefault();
        let data = await update_access(info);
        setPopUpEdit(false);
        if(data.error)
        {
          navigate("../clients", { replace: true });
        }
        let res =  await access_all(id);
        setResult(res);
    }
    let arr = ['orig_name','pwd', 'info','prop'];
    return (
        <div class={styles.container}>
      <form onSubmit={(e) => edit_client(e)} className={styles.forma}>
      <select value={info.type_id} onChange={(e) => setInfo({...info, type_id:e.target.value})}>
            <option value="tRexMQ">tRexMQ</option>
            <option value="tConfig">tConfig</option>
            <option value="tDevice">tDevice</option>
            <option value="tAdmin">tAdmin</option>
          </select>
      {arr.map(el =>  <TextField style={{width:"300px"}}  id="standard-basic" label={el} variant="standard"  value={info[el]} onChange={(e) => setInfo({...info, [el]:e.target.value})} type="text"/>)}
        
          <Button type="submit" style={{marginTop:"40px",marginBottom:"20px" }}  variant="contained">Сохранить</Button>
          <Button onClick={() => setPopUpEdit(false)} variant="contained" color="error">
    Отменить
    </Button>
      </form>
      </div>
    );
  }