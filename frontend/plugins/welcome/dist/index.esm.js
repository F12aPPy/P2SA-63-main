import { Page, pageTheme, Header, Content, ContentHeader, Link, createPlugin } from '@backstage/core';
import React, { useState, useEffect } from 'react';
import { Link as Link$1 } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Table2 from '@material-ui/core/Table';
import TableBody2 from '@material-ui/core/TableBody';
import TableCell2 from '@material-ui/core/TableCell';
import TableContainer2 from '@material-ui/core/TableContainer';
import TableHead2 from '@material-ui/core/TableHead';
import TableRow2 from '@material-ui/core/TableRow';
import Paper2 from '@material-ui/core/Paper';
import Button2 from '@material-ui/core/Button';
import TextField2 from '@material-ui/core/TextField';
import FormControl2 from '@material-ui/core/FormControl';
import Select2 from '@material-ui/core/Select';
import InputLabel2 from '@material-ui/core/InputLabel';
import MenuItem2 from '@material-ui/core/MenuItem';

const BASE_PATH = "http://localhost:8080/api/v1".replace(/\/+$/, "");
const isBlob = (value) => typeof Blob !== "undefined" && value instanceof Blob;
class BaseAPI {
  constructor(configuration = new Configuration()) {
    this.configuration = configuration;
    this.fetchApi = async (url, init) => {
      let fetchParams = {url, init};
      for (const middleware of this.middleware) {
        if (middleware.pre) {
          fetchParams = await middleware.pre({
            fetch: this.fetchApi,
            ...fetchParams
          }) || fetchParams;
        }
      }
      let response = await this.configuration.fetchApi(fetchParams.url, fetchParams.init);
      for (const middleware of this.middleware) {
        if (middleware.post) {
          response = await middleware.post({
            fetch: this.fetchApi,
            url,
            init,
            response: response.clone()
          }) || response;
        }
      }
      return response;
    };
    this.middleware = configuration.middleware;
  }
  withMiddleware(...middlewares) {
    const next = this.clone();
    next.middleware = next.middleware.concat(...middlewares);
    return next;
  }
  withPreMiddleware(...preMiddlewares) {
    const middlewares = preMiddlewares.map((pre) => ({pre}));
    return this.withMiddleware(...middlewares);
  }
  withPostMiddleware(...postMiddlewares) {
    const middlewares = postMiddlewares.map((post) => ({post}));
    return this.withMiddleware(...middlewares);
  }
  async request(context) {
    const {url, init} = this.createFetchParams(context);
    const response = await this.fetchApi(url, init);
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw response;
  }
  createFetchParams(context) {
    let url = this.configuration.basePath + context.path;
    if (context.query !== void 0 && Object.keys(context.query).length !== 0) {
      url += "?" + this.configuration.queryParamsStringify(context.query);
    }
    const body = typeof FormData !== "undefined" && context.body instanceof FormData || context.body instanceof URLSearchParams || isBlob(context.body) ? context.body : JSON.stringify(context.body);
    const headers = Object.assign({}, this.configuration.headers, context.headers);
    const init = {
      method: context.method,
      headers,
      body,
      credentials: this.configuration.credentials
    };
    return {url, init};
  }
  clone() {
    const constructor = this.constructor;
    const next = new constructor(this.configuration);
    next.middleware = this.middleware.slice();
    return next;
  }
}
class RequiredError extends Error {
  constructor(field, msg) {
    super(msg);
    this.field = field;
    this.name = "RequiredError";
  }
}
class Configuration {
  constructor(configuration = {}) {
    this.configuration = configuration;
  }
  get basePath() {
    return this.configuration.basePath != null ? this.configuration.basePath : BASE_PATH;
  }
  get fetchApi() {
    return this.configuration.fetchApi || window.fetch.bind(window);
  }
  get middleware() {
    return this.configuration.middleware || [];
  }
  get queryParamsStringify() {
    return this.configuration.queryParamsStringify || querystring;
  }
  get username() {
    return this.configuration.username;
  }
  get password() {
    return this.configuration.password;
  }
  get apiKey() {
    const apiKey = this.configuration.apiKey;
    if (apiKey) {
      return typeof apiKey === "function" ? apiKey : () => apiKey;
    }
    return void 0;
  }
  get accessToken() {
    const accessToken = this.configuration.accessToken;
    if (accessToken) {
      return typeof accessToken === "function" ? accessToken : () => accessToken;
    }
    return void 0;
  }
  get headers() {
    return this.configuration.headers;
  }
  get credentials() {
    return this.configuration.credentials;
  }
}
function exists(json, key) {
  const value = json[key];
  return value !== null && value !== void 0;
}
function querystring(params, prefix = "") {
  return Object.keys(params).map((key) => {
    const fullKey = prefix + (prefix.length ? `[${key}]` : key);
    const value = params[key];
    if (value instanceof Array) {
      const multiValue = value.map((singleValue) => encodeURIComponent(String(singleValue))).join(`&${encodeURIComponent(fullKey)}=`);
      return `${encodeURIComponent(fullKey)}=${multiValue}`;
    }
    if (value instanceof Object) {
      return querystring(value, fullKey);
    }
    return `${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`;
  }).filter((part) => part.length > 0).join("&");
}
class JSONApiResponse {
  constructor(raw, transformer = (jsonValue) => jsonValue) {
    this.raw = raw;
    this.transformer = transformer;
  }
  async value() {
    return this.transformer(await this.raw.json());
  }
}

function EntUserFromJSON(json) {
  return EntUserFromJSONTyped(json);
}
function EntUserFromJSONTyped(json, ignoreDiscriminator) {
  if (json === void 0 || json === null) {
    return json;
  }
  return {
    age: !exists(json, "age") ? void 0 : json["age"],
    id: !exists(json, "id") ? void 0 : json["id"],
    name: !exists(json, "name") ? void 0 : json["name"]
  };
}
function EntUserToJSON(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value === null) {
    return null;
  }
  return {
    age: value.age,
    id: value.id,
    name: value.name
  };
}

class DefaultApi extends BaseAPI {
  async createUserRaw(requestParameters) {
    if (requestParameters.user === null || requestParameters.user === void 0) {
      throw new RequiredError("user", "Required parameter requestParameters.user was null or undefined when calling createUser.");
    }
    const queryParameters = {};
    const headerParameters = {};
    headerParameters["Content-Type"] = "application/json";
    const response = await this.request({
      path: `/users`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: EntUserToJSON(requestParameters.user)
    });
    return new JSONApiResponse(response, (jsonValue) => EntUserFromJSON(jsonValue));
  }
  async createUser(requestParameters) {
    const response = await this.createUserRaw(requestParameters);
    return await response.value();
  }
  async deleteUserRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling deleteUser.");
    }
    const queryParameters = {};
    const headerParameters = {};
    const response = await this.request({
      path: `/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response);
  }
  async deleteUser(requestParameters) {
    const response = await this.deleteUserRaw(requestParameters);
    return await response.value();
  }
  async getUserRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling getUser.");
    }
    const queryParameters = {};
    const headerParameters = {};
    const response = await this.request({
      path: `/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response, (jsonValue) => EntUserFromJSON(jsonValue));
  }
  async getUser(requestParameters) {
    const response = await this.getUserRaw(requestParameters);
    return await response.value();
  }
  async listUserRaw(requestParameters) {
    const queryParameters = {};
    if (requestParameters.limit !== void 0) {
      queryParameters["limit"] = requestParameters.limit;
    }
    if (requestParameters.offset !== void 0) {
      queryParameters["offset"] = requestParameters.offset;
    }
    const headerParameters = {};
    const response = await this.request({
      path: `/users`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response, (jsonValue) => jsonValue.map(EntUserFromJSON));
  }
  async listUser(requestParameters) {
    const response = await this.listUserRaw(requestParameters);
    return await response.value();
  }
  async updateUserRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling updateUser.");
    }
    if (requestParameters.user === null || requestParameters.user === void 0) {
      throw new RequiredError("user", "Required parameter requestParameters.user was null or undefined when calling updateUser.");
    }
    const queryParameters = {};
    const headerParameters = {};
    headerParameters["Content-Type"] = "application/json";
    const response = await this.request({
      path: `/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "PUT",
      headers: headerParameters,
      query: queryParameters,
      body: EntUserToJSON(requestParameters.user)
    });
    return new JSONApiResponse(response, (jsonValue) => EntUserFromJSON(jsonValue));
  }
  async updateUser(requestParameters) {
    const response = await this.updateUserRaw(requestParameters);
    return await response.value();
  }
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
function ComponentsTable() {
  const classes = useStyles();
  const api = new DefaultApi();
  const [users, setUsers] = useState(Array);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      const res = await api.listUser({limit: 10, offset: 0});
      setLoading(false);
      setUsers(res);
    };
    getUsers();
  }, [loading]);
  const deleteUsers = async (id) => {
    const res = await api.deleteUser({id});
    setLoading(true);
  };
  return /* @__PURE__ */ React.createElement(TableContainer2, {
    component: Paper2
  }, /* @__PURE__ */ React.createElement(Table2, {
    className: classes.table,
    "aria-label": "simple table"
  }, /* @__PURE__ */ React.createElement(TableHead2, null, /* @__PURE__ */ React.createElement(TableRow2, null, /* @__PURE__ */ React.createElement(TableCell2, {
    align: "center"
  }, "ANTENATAL_ID"), /* @__PURE__ */ React.createElement(TableCell2, {
    align: "center"
  }, "PREGNANT_ID"), /* @__PURE__ */ React.createElement(TableCell2, {
    align: "center"
  }, "DOCTOR_ID"), /* @__PURE__ */ React.createElement(TableCell2, {
    align: "center"
  }, "BABYSTATUS_ID"), /* @__PURE__ */ React.createElement(TableCell2, {
    align: "center"
  }, "ADDED_TIME"))), /* @__PURE__ */ React.createElement(TableBody2, null, users.map((item) => /* @__PURE__ */ React.createElement(TableRow2, {
    key: item.id
  }, /* @__PURE__ */ React.createElement(TableCell2, {
    align: "center"
  }, item.id), /* @__PURE__ */ React.createElement(TableCell2, {
    align: "center"
  }, item.name), /* @__PURE__ */ React.createElement(TableCell2, {
    align: "center"
  }, item.age), /* @__PURE__ */ React.createElement(TableCell2, {
    align: "center"
  }, /* @__PURE__ */ React.createElement(Button2, {
    onClick: () => {
      deleteUsers(item.id);
    },
    style: {marginLeft: 10},
    variant: "contained",
    color: "secondary"
  }, "Delete")))))));
}

const WelcomePage = () => {
  const profile = {givenName: "ระบบฝากครรภ์"};
  return /* @__PURE__ */ React.createElement(Page, {
    theme: pageTheme.home
  }, /* @__PURE__ */ React.createElement(Header, {
    title: `Welcome to ${profile.givenName }`,
    subtitle: "นพ.AAA BBBB"
  }), /* @__PURE__ */ React.createElement(Content, null, /* @__PURE__ */ React.createElement(ContentHeader, {
    title: "ข้อมูลระบบฝากครรภ์"
  }, /* @__PURE__ */ React.createElement(Link, {
    component: Link$1,
    to: "/user"
  }, /* @__PURE__ */ React.createElement(Button2, {
    variant: "contained",
    color: "primary"
  }, "Add User"))), /* @__PURE__ */ React.createElement(ComponentsTable, null)));
};

const useStyles$1 = makeStyles((theme) => createStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  margin: {
    margin: theme.spacing(3)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "25ch"
  }
}));
const initialUserState = {
  name: "System Analysis and Design",
  age: 20
};
function Create() {
  const classes = useStyles$1();
  const profile = {givenName: "ระบบฝากครรภ์"};
  const api = new DefaultApi();
  const [user, setUser] = useState(initialUserState);
  const [status, setStatus] = useState(false);
  const [alert, setAlert] = useState(true);
  const CreateUser = async () => {
    const res = await api.createUser({user});
    setStatus(true);
    if (res.id != "") {
      setAlert(true);
    } else {
      setAlert(false);
    }
    const timer = setTimeout(() => {
      setStatus(false);
    }, 1e3);
  };
  return /* @__PURE__ */ React.createElement(Page, {
    theme: pageTheme.home
  }, /* @__PURE__ */ React.createElement(Header, {
    title: `Welcome to ${profile.givenName }`,
    subtitle: "นพ.AAA BBBB"
  }), /* @__PURE__ */ React.createElement(Content, null, /* @__PURE__ */ React.createElement("table", {
    border: "0",
    width: "90%",
    align: "center"
  }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(ContentHeader, {
    title: "เพิ่มข้อมูลฝากครรภ์"
  })), /* @__PURE__ */ React.createElement("td", null), /* @__PURE__ */ React.createElement("td", null), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Button2, {
    variant: "outlined",
    color: "secondary",
    href: "#outlined-buttons"
  }, "LogOut"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("font", {
    size: "3"
  }, "ผู้ฝากครรภ์")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(FormControl2, {
    className: classes.margin,
    variant: "outlined"
  }, /* @__PURE__ */ React.createElement(InputLabel2, {
    id: "label"
  }), /* @__PURE__ */ React.createElement(Select2, {
    labelId: "label",
    id: "select",
    value: "1",
    style: {width: 400}
  }, /* @__PURE__ */ React.createElement(MenuItem2, {
    value: "1"
  }, "30001 นาง สมหญิง นอนน้อย"), /* @__PURE__ */ React.createElement(MenuItem2, {
    value: "2"
  }, "30002 นาง มาดี จริงใจ")))), /* @__PURE__ */ React.createElement("td", null)), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("font", {
    size: "3"
  }, "แพทย์ที่ดูแล")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(FormControl2, {
    className: classes.margin,
    variant: "outlined"
  }, /* @__PURE__ */ React.createElement(InputLabel2, {
    id: "label"
  }), /* @__PURE__ */ React.createElement(Select2, {
    labelId: "label",
    id: "select",
    value: "2",
    style: {width: 400}
  }, /* @__PURE__ */ React.createElement(MenuItem2, {
    value: "2"
  }, "20001 นพ.AAA BBBB")))), /* @__PURE__ */ React.createElement("td", null)), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("font", {
    size: "3"
  }, "สถานะเด็ก")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(FormControl2, {
    className: classes.margin,
    variant: "outlined"
  }, /* @__PURE__ */ React.createElement(InputLabel2, {
    id: "label"
  }), /* @__PURE__ */ React.createElement(Select2, {
    labelId: "label",
    id: "select",
    value: "ปกติ",
    style: {width: 400}
  }, /* @__PURE__ */ React.createElement(MenuItem2, {
    value: "ปกติ"
  }, "7001 ปกติ"), /* @__PURE__ */ React.createElement(MenuItem2, {
    value: "ไม่ปกติ"
  }, "7002 ไม่ปกติ")))), /* @__PURE__ */ React.createElement("td", null)), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("font", {
    size: "3"
  }, "เวลา")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(FormControl2, {
    className: classes.margin
  }, /* @__PURE__ */ React.createElement(TextField2, {
    id: "datetime-local",
    label: "DATE-TIME",
    type: "datetime-local",
    defaultValue: "2017-05-24T10:30",
    className: classes.textField,
    InputLabelProps: {
      shrink: true
    }
  }))), /* @__PURE__ */ React.createElement("td", null))), /* @__PURE__ */ React.createElement("div", {
    className: classes.root
  }, /* @__PURE__ */ React.createElement("form", {
    noValidate: true,
    autoComplete: "off"
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.margin
  }, /* @__PURE__ */ React.createElement(Button2, {
    onClick: () => {
      CreateUser();
    },
    variant: "contained",
    color: "primary"
  }, "Submit"), /* @__PURE__ */ React.createElement(Button2, {
    style: {marginLeft: 20},
    component: Link$1,
    to: "/",
    variant: "contained"
  }, "Back"))))));
}

const plugin = createPlugin({
  id: "welcome",
  register({router}) {
    router.registerRoute("/", WelcomePage);
    router.registerRoute("/user", Create);
  }
});

export { plugin };
