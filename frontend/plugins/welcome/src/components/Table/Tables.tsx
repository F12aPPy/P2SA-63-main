import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { DefaultApi } from '../../api/apis';
import { EntAntenatal } from '../../api/models/EntAntenatal';
import { EntBabystatus } from '../../api/models/EntBabystatus';
import moment from 'moment';

const useStyles = makeStyles({
 table: {
   minWidth: 650,
 },
});
 
export default function ComponentsTable() {
 const classes = useStyles();
 const api = new DefaultApi();
 //const [users, setUsers] = useState(Array);
 const [antenatals, setAntenatal] = useState<EntAntenatal[]>([]);
 const [babystatuss, setBabystatus] = useState<EntBabystatus[]>([]);
 const [loading, setLoading] = useState(true);
 
 useEffect(() => {
   const getAntenatals = async () => {
     const res = await api.listAntenatal({ limit: 10, offset: 0 });
     setLoading(false);
     setAntenatal(res);
   };
   getAntenatals();

   const getBabystatus = async () => {
    const res = await api.listBabystatus({ limit: 10, offset: 0 });
    setLoading(false);
    setBabystatus(res);
    console.log(res);
  };
  getBabystatus();
 }, [loading]);
 
 const deleteAntenatals = async (id: number) => {
   const res = await api.deleteAntenatal({ id: id });
   setLoading(true);
 };
 
 return (
   <TableContainer component={Paper}>
     <Table className={classes.table} aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell align="center">ลำดับ</TableCell>
           <TableCell align="center">ผู้ป่วย</TableCell>
           <TableCell align="center">แพทย์ที่ทำการตรวจ</TableCell>
           <TableCell align="center">สถานะเด็กในครรภ์</TableCell>
           <TableCell align="center">วันที่</TableCell>
           <TableCell align="center">ลบข้อมูล</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {antenatals.map((item:any) => (
           <TableRow key={item.id}>
             <TableCell align="center">{item.id}</TableCell>
             <TableCell align="center">{item.edges.patient.patientName}</TableCell>
             <TableCell align="center">{item.edges.user.userName}</TableCell>
             <TableCell align="center">{item.edges.babystatus.babystatusName}</TableCell>
             <TableCell align="center">{moment(item.addedTime).format('DD/MM/YYYY HH:mm')}</TableCell>
             <TableCell align="center">
               <Button
                 onClick={() => {
                  deleteAntenatals(item.id);
                 }}
                 style={{ marginLeft: 10 }}
                 variant="contained"
                 color="secondary"
               >
                 Delete
               </Button>
             </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
 );
}
