import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {clients} from '../api/clients';
import PopUpCreateComponent from './PopUpCreateComponent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from './Clients.module.css';
import EditIcon from '@mui/icons-material/Edit';
import Edit from './Edit';
import Add from './Add';
import AddIcon from '@mui/icons-material/Add';
import { Tab } from '@mui/material';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function Clients() {
    let navigate = useNavigate();
    const [result, setResult] = useState();
    const [popUpCreate, setPopUpCreate] = useState(false);
    const [PopUpAdd, setPopUpAdd] = useState(false);
    const [Edit_, setEdit] = useState(null);
    const [Add_, setAdd] = useState(null);
    const [PopUpEdit, setPopUpEdit] = useState(true);
    const [find_base, setFindBase] = useState("");
    const [find_c, setFindC] = useState("");
    const [info, setInfo] = useState();
    const [base_name, setBaseName] = useState(true);
    const [cname, setCName] = useState(true);

    
    function find_baseChange(e)
    {
        setFindBase(e.target.value);
    }

    function find_cChange(e)
    {
        setFindC(e.target.value);
    }

    async function showPopUpCreate(){
        setPopUpCreate(true);
    }

    function searachAll(find, row,  _result)
    {
        const res = _result.filter(el => el[row].search(find) !== -1);
        setInfo(res);
    }
    useEffect(()=>{
        if(info)
        {
            let res;
            if(base_name)
            {
                res = info.sort(function(a, b){
                    if (a.base_name < b.base_name) {
                        return -1;
                      }
                      if (a.base_name > b.base_name) {
                        return 1;
                      }
                      return 0;
                })
            }
            else
            {
                res = info.sort(function(a, b){
                    if (a.base_name < b.base_name) {
                        return 1;
                      }
                      if (a.base_name > b.base_name) {
                        return -1;
                      }
                      return 0;
                })
            }
            setResult(res);
            setInfo(res);
        }
    },[base_name])

    useEffect(()=>{
        if(info)
        {
            let res;
            if(cname)
            {
                res = info.sort(function(a, b){
                    if (a.cname < b.cname) {
                        return -1;
                      }
                      if (a.cname > b.cname) {
                        return 1;
                      }
                      return 0;
                })
            }
            else
            {
                res = info.sort(function(a, b){
                    if (a.cname < b.cname) {
                        return 1;
                      }
                      if (a.cname > b.cname) {
                        return -1;
                      }
                      return 0;
                })
            }
            console.log(res);
            setResult(res);
            setInfo(res);
        }
    },[cname])

    useEffect(()=>{
        if(find_base === '' && find_c === '') setInfo(result);
        if(find_base !== '')
        {
            setFindC("");
            searachAll(find_base, "base_name", result);
        }
    },[find_base])
    useEffect(()=>{
        if(find_base === '' && find_c === '') setInfo(result);
        if(find_c !== '')
        {
            setFindBase("");
            searachAll(find_c, "cname", result);
        }
    },[find_c])

    useEffect(() =>{
        async function func(){
            // setBaseName(_ => {
            //     setCName(true);
            //     return true;
            // });
            
            let res =  await clients();
            if(res.error)
            {
                navigate("../login", { replace: true });
            }
            // else 
            // {

            //     let title = null;
            //     for(var el in res[0])
            //     {
            //         console.log(el);
            //         if(!title) title = <th>{el}</th>;
            //         title += <th>{el}</th>;
            //     }
            //     setInfo(title);
            // }
            // console.log(res);
            setResult(res);
            setInfo(res);
        }
        func();
    },[]);
    let style;
    if(!popUpCreate) style = styles.bigtable;
    else style = styles.bigtable2;
    // console.log(result);
    // result[0].status = 0;
    return info && (
    //   <table> <tr>{Object.keys(result[0]).map((el,i)=><th key={i}>{el}</th>)}</tr>
    //         {result.map(el=>
    //         <tr key={el.id}>{Object.keys(result[0]).map(key => <td>{el[key]}</td>)}</tr>
    //         )

    //         }
    //   </table>
    <>
    {(Edit_ && PopUpEdit)? <Edit elem={Edit_} setPopUpEdit={setPopUpEdit} setResult={setResult}/> : <></>}
    {(Add_ && PopUpAdd)? <Add  setPopUpAdd={setPopUpAdd} setResult={setResult} id={Add_.id}/> : <></>}
    {popUpCreate ? <PopUpCreateComponent setPopUpCreate={setPopUpCreate} setResult={setResult}/> : <></>}
    {popUpCreate ? <></>
    :<div className={styles.top}><Button onClick={showPopUpCreate} style={{marginTop:"20px", marginLeft:"20px"}} variant="contained" color="success">
    ???????????????? ????????????????????????
    </Button>
    <h2 className={styles.list}>
        ???????????? ??????????????????????????:
    </h2></div>
    }
    <div className={style}>
    <TextField
        id="outlined-name"
        label="?????????? ???? base_name"
        value={find_base}
        onChange={find_baseChange}
    />
    <TextField
        id="outlined-name"
        label="?????????? ???? cname"
        value={find_c}
        onChange={find_cChange}
    />
    <TableContainer   component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                
                {['id', 'base_name', 'cname', 'url', 'info', 'ws_url', 'params', 'reg_date'].map((el,i)=>{
                if(el !== 'base_name' && el !== 'cname')
                    return <TableCell align="center" key={i}>{el}</TableCell>
                else 
                    if (el === 'base_name')
                        return <TableCell onClick={() => setBaseName(!base_name)} align="center" key={i}>{el}{base_name ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}</TableCell>
                    else 
                        return <TableCell onClick={() => setCName(!cname)} align="center" key={i}>{el}{cname ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}</TableCell>
                })}
                <TableCell>Access</TableCell>
                </TableRow>

            </TableHead>
            <TableBody>
                
                {info.map(el=>
                <TableRow className={styles.row} key={el.id}>
                    {['id', 'base_name', 'cname', 'url', 'info', 'ws_url', 'params', 'reg_date'].map(key => {
                     if (key !== 'reg_date') return <TableCell key={key}>{el[key]}</TableCell>
                     else return <TableCell key={key}>{moment.unix(el['reg_date']).format('DD/MM/YYYY')}</TableCell>
                     })}
                <TableCell><Button variant="outlined" onClick={() => {
                    localStorage.setItem("id", el.id);
                    navigate("../access", { replace: true });
                    }}>????????????????</Button></TableCell>
                <div className={styles.edit}> <EditIcon onClick={() => { setPopUpEdit(true); setEdit(el);}} className={styles.edit_icon}/></div>
                    <AddIcon className={styles.add} onClick={() => {setPopUpAdd(true); setAdd(el);}}/>
                </TableRow>
                )}

            </TableBody>
        </Table>
    </TableContainer>
    </div>
    </>
    );
}

export default Clients;
  