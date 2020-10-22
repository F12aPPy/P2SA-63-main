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

export default function Create() {
  const classes = useStyles();
  const profile = { givenName: 'โปรดเข้าสู่ระบบเพื่อใช้งานระบบฝากครรภ์' };
  const api = new DefaultApi();

  const [users, setUsers] = useState<EntUser[]>([]);
  const [userid, setUserid] = useState(Number);
  const [status, setStatus] = useState(false);
  const [alert, setAlert] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getUsers = async () => {

      const us = await api.listUser({ limit: 10, offset: 0 });
      setLoading(false);
      setUsers(us);
    };
    getUsers();

  }, [loading]);

  const user_id_handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserid(event.target.value as number);
  };

  return (
    <Page theme={pageTheme.home}>
      <Header
        title={`${profile.givenName || 'to Backstage'}`}
        //subtitle="บันทึกข้อมูลฝากครรภ์."
      ></Header>
      <Content>
        <ContentHeader title="Login">
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
              <tr><td align="right">User ID</td><td>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="outlined"
                >
                  <InputLabel id="name_id-label">User_Email</InputLabel>
                  <Select
                    labelId="user_id-label"
                    label="User"
                    id="user_id"
                    value={userid}
                    onChange={user_id_handleChange}
                    style={{ width: 600 }}
                  >
                    {users.map((item: EntUser) =>
                      <MenuItem value={item.id}>{item.userEmail}</MenuItem>)}
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
            </table>
            <center>
            <div className={classes.margin}>
              <Button
                component={RouterLink}
                to="/welcomepage"
                variant="contained"

                color="primary"
              >
                เข้าสู่ระบบ
                </Button>
            </div>
          </form>
        </div>
        </center>
      </Content>
    </Page>
  );
}