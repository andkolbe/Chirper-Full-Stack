import * as mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool(config.mysql); // pool automaticaly handles the handshaking Connection process for us // createPool is a function that takes an object as its argument
// This is how we connect our database to our project


export const Query = <T = any>(query, values?: any) => { // <T = any> means pass in a generic if I have one, otherwise, have a default type of any
    return new Promise<T>((resolve, reject) =>  { // we have to write a Promise to avoid callback hell
        pool.query(query, values, (err, results) => { 
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

import chirps from './queries/chirps';

export default { // you can import this page into another page and it will bring all of its properties with it
    chirps // this will have access to properties in the chirps.ts page
}

