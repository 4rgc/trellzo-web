import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Boards from './pages/Boards';
import Login from './pages/Login';

const App: React.FC = () => {
	return (
		<Router>
		<div className="App">
				<Routes>
					<Route index element={<Login />} />
					<Route element={<Boards />} path="boards" />
				</Routes>
		</div>
		</Router>
	);
};

export default App;
