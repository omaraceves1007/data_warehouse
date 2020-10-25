require ( 'dotenv' ).config();
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const apiRouter = require( './routes/api' );
const { connection } = require( './database/connection' );

// const apiRouter = require( './routes/api' );

const app = express();
// import env port
const PORT = process.env.PORT;
// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: false } ) );
// parse application/json
app.use( bodyParser.json() );
// connect db
connection();

app.use( '/api', apiRouter );
app.get( '/', ( req, res ) => res.send( 'Hello dotenv' ) );

app.listen( PORT, () => console.log( 'Online in: ', PORT ) );