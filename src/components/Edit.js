import { useState } from "react";
import { update } from "../api/update";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './PopUpCreate.module.css';
import {clients} from '../api/clients';
import { useNavigate } from 'react-router-dom';

export default function Edit({elem, setPopUpEdit, setResult}) {
    let navigate = useNavigate();
    const [info, setInfo] = useState({
        ...elem
    });
    async function edit_client(e)
    {
        e.preventDefault();
        let data = await update(info);
        setPopUpEdit(false);
        let res =  await clients();
        setResult(res);
        if(res.error)
        {
          navigate("../login", { replace: true });
        }
    }

    return (
        <div class={styles.container}>
      <form onSubmit={(e) => edit_client(e)} className={styles.forma}>
      
          <TextField style={{width:"300px"}} id="standard-basic" label="base_name" variant="standard"  value={info.base_name} onChange={(e) => setInfo({...info, base_name:e.target.value})} type="text"/>
          <TextField style={{width:"300px"}} id="standard-basic" label="c_name" variant="standard"  value={info.cname} onChange={(e) => setInfo({...info, cname:e.target.value})} type="text"/>
          <TextField style={{width:"300px"}} id="standard-basic" label="url" variant="standard"   value={info.url} onChange={(e) => setInfo({...info, url:e.target.value})} type="text"/>
          <TextField style={{width:"300px"}} id="standard-basic" label="ws_url" variant="standard"   value={info.ws_url} onChange={(e) => setInfo({...info, ws_url:e.target.value})} type="text"/>
          <TextField style={{width:"300px"}} id="standard-basic" label="info" variant="standard"   value={info.info} onChange={(e) => setInfo({...info, info:e.target.value})} type="text"/>
          <TextField style={{width:"300px"}} id="standard-basic" label="params" variant="standard"   value={info.params} onChange={(e) => setInfo({...info, params:e.target.value})} type="text"/> 
        
          <Button type="submit" style={{marginTop:"40px",marginBottom:"20px" }} className={styles.submit1} variant="contained">Сохранить</Button>
          <Button onClick={() => setPopUpEdit(false)} variant="contained" color="error">
    Отменить
    </Button>
      </form>
      </div>
    );
  }