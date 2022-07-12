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

function Clients() {
    let navigate = useNavigate();
    const [info, setInfo] = useState(null);
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
    {(Edit_ && PopUpEdit)? <Edit elem={Edit_} setPopUpEdit={setPopUpEdit} setResult={setResult}/> : <></>}
    {(Add_ && PopUpAdd)? <Add  setPopUpAdd={setPopUpAdd} setResult={setResult} id={Add.id}/> : <></>}
    {popUpCreate ? <PopUpCreateComponent setPopUpCreate={setPopUpCreate} setResult={setResult}/> : <></>}
    {popUpCreate ? <></>
    :<Button onClick={showPopUpCreate} style={{"marginTop":"20px", "marginLeft":"20px"}}variant="contained" color="success">
    Добавить пользователя
    </Button>}
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
                    <AddIcon className={styles.add} onClick={() => {setPopUpAdd(true); setAdd(el);}}/>
                </TableRow>
                )}

            </TableBody>
        </Table>
    </TableContainer>
    </>
    );
}

export default Clients;
  