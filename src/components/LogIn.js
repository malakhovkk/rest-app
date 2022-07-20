import TextField from '@mui/material/TextField';
import styles from './LogIn.module.css';
import Button from '@mui/material/Button';
import {login} from '../api/login';
import {useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
function LogIn(props) {
  
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    let token = null;
    let navigate = useNavigate();

async function login_action(e){
        e.preventDefault();
        //console.log(name, password);
        token =  await login(name, password);
        localStorage.setItem('token', token);
        navigate("../clients", { replace: true });
        //history.replace('/clients');
   }

  return (
    <div className={styles.login}>
      <div className={styles.myforma}>
    <form onSubmit={login_action}>
      <p className={styles.company}>
      Компания ЮСИЭС сервис<br/>
Система лицензирования

      </p>
    <TextField
    required
    id="outlined-required"
    label="Login"
    defaultValue=""
    value={name}
    style={{'width':'300px'}}
    onChange={(e) => setName(e.target.value)}
  />
   <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{'marginTop':'20px', 'width':'300px'}}
        />
    <Button variant="contained" type="submit"  size="large" style={{'marginTop':'30px', 'width':'300px'}}>
          Войти
        </Button>
        </form>
        </div>
  </div>
    );
}

export default LogIn;
