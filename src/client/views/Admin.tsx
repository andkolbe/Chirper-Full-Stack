import * as React from 'react';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import type { IChirp } from '../utils/types'; // type means only import typescript data instead of compiled javascript. Easier on the system
import { RouteComponentProps, useParams, useHistory } from 'react-router-dom';


const Admin: React.FC<AdminProps> = props => {

    const [id, setUserId]  = useParams();
    const history = useHistory();

    const [chirp, setChirp] = useState<IChirp>(null);

    useEffect(() => {
        const getChirp = async () => {
            const res = await fetch(`/api/chirps/${id}`); // fetch your list of chirps
            const chirp = await res.json(); // parse json to javascript
            setChirp(chirp); // sets a new state from blank to chirp data
        };
        getChirp(); // call the function because here it is not anonymous
    }, [id]);

    /*
    constructor(props: IAdminProps) {
        super(props);
        this.state = { // you need name and text for a POST request
            name: '',
            text: ''
        }
    }
    */

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { // how to strongtype an event inside of react
        this.setState({ name: e.target.value });
    }

    handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        this.setState({ text: e.target.value });
    }

    handleEditChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log({ content, location });
        const res = await fetch(`/api/chirps/${this.props.match.params.id}`, { // fire await this promise 1st
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // kicks on express.json middleware
            },
            body: JSON.stringify({ name: this.state.name, text: this.state.text })
        })
        const pepperoni = await res.json(); // fire await this promise 2nd
        console.log(pepperoni.msg); // fire 3rd
        history.push('/'); // fire 3rd
    }   

    handleDeleteChirp = async (e: React.MouseEvent<HTMLButtonElement>) => { // clicking the mouse is a mouse event
        e.preventDefault();
        const res = await fetch(`/api/chirps/${this.props.match.params.id}`, {
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
                    <input value={content} onChange={this.handleNameChange} id="editName" type="text" className="form-control bg-warning" />
                    <label htmlFor="editMessage" className="mt-4 font-weight-bold">Edit Location</label>
                    <input value={location} onChange={this.handleTextChange} id="editMessage" type="text" className="form-control bg-warning" />
                    <div className="d-flex justify-content-between mt-4">
                        <button onClick={handleEditChirp} className="btn btn-success font-weight-bold text-white">Save Edit</button>
                        <button onClick={handleDeleteChirp} className="btn text-danger font-weight-bold text-white">Delete</button>
                    </div>
                </form>
            </Layout>
        )
    
}

interface AdminProps {}
interface AdminState { // identifying your state and props first will help you with intellisence as you write the rest of your code
   
}

export default Admin;


// the state of the name and text are initially blank strings
// it mounts to the dom and renders a blank form
// it will then run async componentDidMount
// fetch the individual chirp and set name to chirp.name and text to chirp.text
// state updates from blank strings to chirp.name and chirp.text
// once state changes, the component rerenders and the values of the inputs are updated with state.name and state.text
