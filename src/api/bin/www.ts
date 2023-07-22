import {App} from "./app";

const Http = require('http');
const Debug = require('debug');
const DotEnv = require('dotenv');

DotEnv.config();

const debug = Debug('server:naturart');

/**
 *  Enable settings
 */
debug.enabled = true;

const server = Http.createServer(App.getInstance().core);
const PORT = process.env.PORT || '3000'

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: any) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = 'Pipe ' + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? addr
        : addr.port;

    debug(`
                  * *
                * *        ###
                 *       #####@#
                *       ##@######
            ___I_       @#####@##
           /\\-_--\\       ##@####
          /__\\_-__\\        | |   NaturArt API
          |[]| [] |      #¬  |   ------------
  ________|__|____|___##___| |_______#_____#_#___________

  NaturArt API has been started. Press Ctrl+C to shutdown.
  Access NaturArt API by this URL => http://localhost:${bind}/
  `);
}

/**
 * Event listener for HTTP server "request" event.
 */
const onRequest = (req: any) => {
    debug(`http ${req.method}: ${req.url}`);
}

export function run() {
    server.on('error', onError);
    server.on('listening', onListening);
    server.on('request', onRequest);
    server.listen(PORT);
}
