import * as React from 'react';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import type { IChirp } from '../utils/types'; // type means only import typescript data instead of compiled javascript. Easier on the system
import { useParams, useHistory } from 'react-router-dom';


const Admin: React.FC<AdminProps> = props => {

    const { id } = useParams();

    const history = useHistory();

    const [chirp, setChirp] = useState<IChirp>(null);
    const [content, setContent] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    useEffect(() => { // UseEffect is similar to componentDidMount. It runs after the initial render
        const getChirp = async () => {
            const res = await fetch(`/api/chirps/${id}`); // fetch your list of chirps
            const chirp = await res.json(); // parse json to javascript
            setChirp(chirp); // sets a new state from blank to chirp data
        };
        getChirp(); // call the function because here it is not anonymous
    }, []);
    // whatever goes in the array, triggers the useEffect to rerun
    // we want it to be filled with the id data, so we fill the array with [id]
    // we cannot place async keyword at the top of useEffect. useEffects always returns a cleanup function even if you don't write it
    // cleanup function: return () => {}
    // async return a Promise, and useEffect returns a function. Put async inside of the function


    const editChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // prevents the page from reloading before the PUT method executes
        const res = await fetch(`/api/chirps/${id}`, { // fire await this promise 1st
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // kicks on express.json middleware
            },
            body: JSON.stringify({ content, location })
        })
        const pepperoni = await res.json(); // fire await this promise 2nd
        console.log(pepperoni.msg); // fire 3rd
        history.push('/'); // fire 3rd
    }   

    const deleteChirp = async (e: React.MouseEvent<HTMLButtonElement>) => { // clicking the mouse is a mouse event
        e.preventDefault();
        const res = await fetch(`/api/chirps/${id}`, {
            method: 'DELETE'
        })
        const ramen = await res.json();
        console.log(ramen.msg)
        history.push('/');
    }

        return (
            <Layout>
                <form className="border p-4 shadow form-group bg-white">
                    <label htmlFor="editName" className="font-weight-bold">Edit Content</label>
                    <input value={content} onChange={e => setContent(e.target.value)} id="editName" type="text" className="form-control bg-warning" />
                    <label htmlFor="editMessage" className="mt-4 font-weight-bold">Edit Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id="editMessage" type="text" className="form-control bg-warning" />
                    <div className="d-flex justify-content-between mt-4">
                        <button onClick={editChirp} className="btn btn-success font-weight-bold text-white">Save Edit</button>
                        <button onClick={deleteChirp} className="btn text-danger font-weight-bold text-white">Delete</button>
                    </div>
                </form>
            </Layout>
        )
    
}

interface AdminProps {}

export default Admin;


