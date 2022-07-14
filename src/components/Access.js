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
import styles from './Access.module.css';
import EditIcon from '@mui/icons-material/Edit';
import Edit2 from './Edit2';
import Add from './Add';
import AddIcon from '@mui/icons-material/Add';
import { access_all } from '../api/access_all';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Access() {
    let id = localStorage.getItem("id");
    let navigate = useNavigate();
    const [result, setResult] = useState();
    const [popUpCreate, setPopUpCreate] = useState(false);
    const [PopUpAdd, setPopUpAdd] = useState(false);
    const [Edit_, setEdit] = useState(null);
    const [Add_, setAdd] = useState(null);
    const [PopUpEdit, setPopUpEdit] = useState(true);
    async function showPopUpCreate(){
        setPopUpCreate(true);
    }

    useEffect(() =>{
        async function func(){
            let res =  await access_all(id);
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
            console.log(res);
            setResult(res);
        }
        func();
    },[]);
    console.log(result);
    return result && (
    //   <table> <tr>{Object.keys(result[0]).map((el,i)=><th key={i}>{el}</th>)}</tr>
    //         {result.map(el=>
    //         <tr key={el.id}>{Object.keys(result[0]).map(key => <td>{el[key]}</td>)}</tr>
    //         )

    //         }
    //   </table>
    <>
    <ArrowBackIosIcon style={{cursor : 'pointer'}} onClick={() =>{
        navigate("../clients", { replace: true });
    }}/>
    {(Edit_ && PopUpEdit)? <Edit2 elem={Edit_} setPopUpEdit={setPopUpEdit} setResult={setResult}/> : <></>}
    {popUpCreate ? <PopUpCreateComponent setPopUpCreate={setPopUpCreate} setResult={setResult}/> : <></>}

    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                
                {Object.keys(result[0]).map((el,i)=><TableCell align="center" key={i}>{el}</TableCell>)}
                </TableRow>

            </TableHead>
            <TableBody>
                
                {result.map(el=>
                <TableRow key={el.id}>{Object.keys(result[0]).map(key => <TableCell key={key}>{el[key]}</TableCell>)}
                <div className={styles.edit}> <EditIcon onClick={() => { setPopUpEdit(true); setEdit(el);}} className={styles.edit_icon}/></div>
                </TableRow>
                )}

            </TableBody>
        </Table>
    </TableContainer>
    </>
    );
}

export default Access;
  