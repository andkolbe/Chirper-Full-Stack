import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/:id', async (req, res) => { // networking layer
    try {
        const pizza = Number(req.params.id); // data layer
        const [chirp] = await db.chirps.one(pizza);
        res.json(chirp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'WHYYYYYYY', error: error.message }); // sends your own smaller written message to postman instead of the giant block message
    }
})

router.get('/', async (req, res) => {
    try {
        const chirps = await db.chirps.all();
        res.json(chirps);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'WHYYYYYYY', error: error.message }); // you have to import your database into your routes to execute it. You're telling your database to run when your server runs
    }
})

router.post('/', async (req, res) => {
    try {
        const newChirp = req.body; // best practice to store in variable // req.body is all of the form data
        const result = await db.chirps.insert(newChirp.userid, newChirp.content, newChirp.location);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'NOOOOOOOOOOOO', error: error.message })
        
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const editedChirp = req.body;
        const result = await db.chirps.update(id, editedChirp.content, editedChirp.location);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'FFFFFFFFFF', error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await db.chirps.destroy(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'this sucks', error: error.message })
    }
})

export default router;

// select statements always return arrays no matter what