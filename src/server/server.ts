import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import apiRouter from './routes';



const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json()); // body parser
app.use('/api', apiRouter); // /api is optional but it visually seperate backend routes from frontend
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html'))); 
// tells the server: if a route doesn't start with /api, get out of the way, ignore it, it's front end

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
