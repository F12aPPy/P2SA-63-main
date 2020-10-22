import React, { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Content,
  Header,
  Page,
  pageTheme,
  ContentHeader,
} from '@backstage/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Alert } from '@material-ui/lab';
import { DefaultApi } from '../../api/apis';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { EntBabystatus, EntPatient } from '../../api/models';
import { EntUser } from '../../api/models/EntUser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    margin: {
      margin: theme.spacing(3),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }),
);

/*const initialUserState = {
  name: 'System Analysis and Design',
  age: 20,
};*/

export default function Create() {
  const classes = useStyles();
  const profile = { givenName: 'กรอกข้อมูลการฝากครรภ์' };
  const api = new DefaultApi();

  //const [user, setUser] = useState(initialUserState);
  const [users, setUsers] = useState<EntUser[]>([]);
  const [patients, setPatients] = useState<EntPatient[]>([]);
  const [babystatuss, setBabystatuss] = useState<EntBabystatus[]>([]);
  const [status, setStatus] = useState(false);
  const [alert, setAlert] = useState(true);
  const [loading, setLoading] = useState(true);

  const [userid, setUserid] = useState(Number);
  const [patientid, setPatientid] = useState(Number);
  const [babystatusid, setBabystatusid] = useState(Number);
  const [datetime, setDatetime] = useState(String);

  useEffect(() => {

    const getPatients = async () => {

      const pa = await api.listPatient({ limit: 10, offset: 0 });
      setLoading(false);
      setPatients(pa);
    };
    getPatients();

    const getUsers = async () => {

      const us = await api.listUser({ limit: 10, offset: 0 });
      setLoading(false);
      setUsers(us);
    };
    getUsers();

    const getBabystatuss = async () => {

      const bs = await api.listBabystatus({ limit: 10, offset: 0 });
      setLoading(false);
      setBabystatuss(bs);
    };
    getBabystatuss();

  }, [loading]);

  const handleDatetimeChange = (event: any) => {
    setDatetime(event.target.value as string)
  };

  const CreateAntenatal = async () => {
    const antenatal = {
      added: datetime + ":00+07:00",
      patientID: patientid,
      babystatusID: babystatusid,
      userID: userid,
    }
    console.log(antenatal);
    const res: any = await api.createAntenatal({ antenatal: antenatal });
    setStatus(true);
    if (res.id != '') {
      setAlert(true);
    } else {
      setAlert(false);
    }

    const timer = setTimeout(() => {
      setStatus(false);
    }, 1000);
  };

  const patient_id_handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPatientid(event.target.value as number);
  };

  const user_id_handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserid(event.target.value as number);
  };

  const babystatus_id_handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBabystatusid(event.target.value as number);
  };

  return (
    <Page theme={pageTheme.website}>
      <Header
        title={`${profile.givenName || 'to Backstage'}`}
        //subtitle="บันทึกข้อมูลฝากครรภ์."
      ></Header>
      <Content>
        <ContentHeader title="Create">
          {status ? (
            <div>
              {alert ? (
                <Alert severity="success">
                  This is a success alert — check it out!
                </Alert>
              ) : (
                  <Alert severity="warning" style={{ marginTop: 20 }}>
                    This is a warning alert — check it out!
                  </Alert>
                )}
            </div>
          ) : null}
        </ContentHeader>
        <div className={classes.root}>
          <form noValidate autoComplete="off">
            <table>
              <tr><td align="right">ชื่อแพทย์</td><td>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="outlined"
                >
                  <InputLabel id="name_id-label">User_Name</InputLabel>
                  <Select
                    labelId="user_id-label"
                    label="User"
                    id="user_id"
                    value={userid}
                    onChange={user_id_handleChange}
                    style={{ width: 600 }}
                  >
                    {users.map((item: EntUser) =>
                      <MenuItem value={item.id}>{item.userName}</MenuItem>)}
                  </Select>
                </FormControl>
              </td></tr>
              {/*
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <TextField
                  id="age"
                  label="Age"
                  variant="outlined"
                  type="number"
                  size="medium"
                  value={user.age}
                  onChange={handleInputChange}
                />
              </FormControl>
    */}

              <tr><td align="right">ผู้ตั้งครรภ์</td><td>

                <FormControl
                  className={classes.margin}
                  variant="outlined"
                >
                  <InputLabel id="patient_id-label">Patient_Name</InputLabel>
                  <Select
                    labelId="patient_id-label"
                    label="Patient"
                    id="patient_id"
                    value={patientid}
                    onChange={patient_id_handleChange}
                    style={{ width: 600 }}
                  >
                    {patients.map((item: EntPatient) =>
                      <MenuItem value={item.id}>{item.patientName}</MenuItem>)}
                  </Select>
                </FormControl>
              </td></tr>
              <tr><td align="right">สถานะเด็ก</td><td>
                <div>
                  <FormControl
                    className={classes.margin}
                    variant="outlined"
                  >

                    <InputLabel id="babystatus_id-label">Babystatus_name</InputLabel>
                    <Select
                      labelId="babystatus_id-label"
                      label="babystatus"
                      id="babystatus_id"
                      value={babystatusid}
                      onChange={babystatus_id_handleChange}
                      style={{ width: 600 }}
                    >
                      {babystatuss.map((item: EntBabystatus) =>
                        <MenuItem value={item.id}>{item.babystatusName}</MenuItem>)}
                    </Select>
                  </FormControl>
                </div>
              </td></tr>
              <tr><td align="right">วัน/เวลา</td><td>
                <div>
                  <FormControl className={classes.margin} >
                    <TextField
                      id="date"
                      label="DateTime"
                      type="datetime-local"
                      value={datetime}
                      onChange={handleDatetimeChange}
                      //defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>

                </div>
              </td></tr>
            </table>
            <center>                     
            <div className={classes.margin}>
              <Button
                onClick={() => {
                  CreateAntenatal();

                }}
                component={RouterLink}
                to="/user"
                variant="contained"

                color="primary"
              >
                บันทึกข้อมูล
                </Button>
              <Button
                style={{ marginLeft: 20 }}
                component={RouterLink}
                to="/welcomepage"
                variant="contained"
                color="default"
              >
                กลับ
                </Button>
            </div>
            </center>
          </form>
        </div>
      </Content>
    </Page>
  );
}
