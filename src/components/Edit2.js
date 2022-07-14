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
        console.log(data);
        let res =  await access_all(id);
        setResult(res);
    }
    let arr = ['type_id', 'orig_name','pwd', 'info','prop','id','status'];
    return (
        <div class={styles.container}>
      <form onSubmit={(e) => edit_client(e)} className={styles.forma}>
      
      {arr.map(el =>  <TextField  id="standard-basic" label={el} variant="standard"  value={info[el]} onChange={(e) => setInfo({...info, [el]:e.target.value})} type="text"/>)}
        
          <Button type="submit" className={styles.submit1} variant="contained">Сохранить</Button>
          <Button onClick={() => setPopUpEdit(false)} variant="contained" color="error">
    Отменить
    </Button>
      </form>
      </div>
    );
  }