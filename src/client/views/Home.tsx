import * as React from 'react';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import type { IChirp } from '../utils/types'
import moment from 'moment';
import { Link } from 'react-router-dom';

const Home: React.FC<HomeProps> = (props) => {

    const [chirps, setChirps] = useState<IChirp[]>([]);
    // page renders blank array, fetch occurs, page rerenders with IChirp array

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/chirps');
            const chirps = await res.json(); // parse the json data
            setChirps(chirps);
        })() // IIFE Immediately Invoked Function Expression. We make an anonymous arrow function and immediately invoke it
    }, []);
    // only runs once on page load. we don't want it to rerun, therefore we will place a blank array so that it will always be blank
    // we cannot place async keyword at the top of useEffect. useEffects always returns a cleanup function even if you don't write it
    // cleanup function: return () => {}
    // async return a Promise, and useEffect returns a function. Put async inside of the function

    return (
        <Layout>
            {chirps.map(chirp => (
                <div className="card my-2 shadow">
                    <div className="card-body">
                        <h5 className="card-title">{chirp.name}</h5>
                        <p className="card-text">{chirp.content}</p>
                        <small className="card-text text-secondary">{moment(chirp.created_at).format('h:mm a - MMMM Do YYYY')}</small>
                        <div className="d-flex justify-content-end">
                            <Link className="btn text-success font-weight-bold" to={`/chirp/${chirp.id}/admin`}>Edit Chirp</Link>
                        </div>
                    </div>
                </div>
            ))}
        </Layout>
    );
}

interface HomeProps {}

export default Home;