import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './views/Home';
import NewChirp from './views/NewChirp';
import Admin from './views/Admin';
import NotFound from './views/NotFound';



const App: React.FC<AppProps> = (props, state) => {

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/chirps/add'>
					<NewChirp />
				</Route>
				<Route exact path='/chirps/:id/admin'>
					<Admin />
				</Route>
				<Route exact path='*'> 
					<NotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);

}

// interface is a way to define a type
interface AppProps {} // this is blank because App in index.tsx is recieving no props

// interfaces describes a component's props (if it has any)

export default App;

// BrowserRouter can be renamed anything
// think of Switch like a switch board
// Route is not self closing when using Hooks
// path reads the url bar
// Route paths need to have the word exact or they will only route in alphbetical order
// Link replaces any anchor or button element that has to lead you to a different page
// Link needs to have a prop called 'to' that needs to a string of some kind
// you can render NavBar above Switch. Switch acts like the body of the page
// NavBar won't re render because it is above the Switch

// hitting enter on a url bar executes a GET request to a server