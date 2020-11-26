import * as React from 'react';
import Layout from '../components/Layout';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const NewChirp: React.FC<NewChirpProps> = props => {
    const history = useHistory();

    const [userid, setUserid] = useState<string>(''); // even though the userid is a number, inputs are always strings
    const [content, setContent] = useState<string>('');
    const [location, setLocation] = useState<string>('');


    const addChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // prevents the form from refreshing the page before the POST promise can execute. Otherwise the click will reset the page with black form data
        const res = await fetch('/api/chirps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // kicks on express.json body parser middleware. fetch is not opinionated so we have to write this out
            },
            body: JSON.stringify({ userid, content, location})
        });
        const serverResponse = await res.json();
        console.log(serverResponse.msg); // this is the msg on the post route back in chirps.ts
        history.push('/'); // this takes you back to the homepage after adding a new chirp
    }

        return (
            <Layout>
                <form className="form-group border p-4 shadow bg-white">
                    <label htmlFor="name" className="font-weight-bold">Userid</label>
                    <input value={userid} onChange={e => setUserid(e.target.value)} id="name" type="text" className="form-control bg-warning" /> 
                    <label htmlFor="message" className="mt-4 font-weight-bold">Content</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} rows={6} id="message" className="form-control my-1 bg-warning" />
                    <label htmlFor="name" className="font-weight-bold">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id="name" type="text" className="form-control bg-warning" />
                    <button onClick={addChirp} type="submit" className="btn btn-success mt-4 font-weight-bold">Submit<FaCheck className="ml-2" /></button>
                </form>
            </Layout>
        );

        // React can infer what elements the input and text areas are because they are inline. We don't have to write <HTMLInputElement> or <HTMLTextAreaElement>  
}

// htmlFor + id is for screen reading to help people who can't see well 

interface NewChirpProps {} // extend RouteComponentProps to access history, location, and match

export default NewChirp;