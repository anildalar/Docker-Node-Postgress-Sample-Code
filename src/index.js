const express = require('express')
const app = express()
const env = require('dotenv');
env.config();
let port = process.env.PORT || 4000;

const { Client } = require('pg');
const client = new Client({
    host: 'db',
    user: 'docker',
    database: 'docker',
    password: 'mysecretpassword',
    port: 5432
});


const createTableText = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB
);
`
async function con(){
    await client.connect();
    await client.query(createTableText)
}
con();

app.get('/', async (req, res) =>{
    res.status(200).send('<h1>Its Work123!</h1>');
});
app.get('/email', async (req, res) =>{
    // create our temp table
    const newUser = { email: req.query.email }
    // create a new user
    await client.query('INSERT INTO users(data) VALUES($1)', [newUser])
    const { rows } = await client.query('SELECT * FROM users')
    console.log(rows)
    res.status(200).send('<h1>It Works!</h1>'+req.query.email);
});


app.listen(port,()=>{
    console.log('listening on port ',port);
});