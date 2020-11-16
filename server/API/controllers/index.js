const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').createServer(app);
const users = require('./users');
const entrys = require('./entrys');

app.use(bodyParser.json());
app.use(cors());

const controllers = [
    users,
    entrys,
];

app.use(controllers);

http.listen(3000,()=>{
    console.log("Server Starting");
});