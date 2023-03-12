import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from './redux/store';
import { App } from './app';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Provider store={store}>
		<HashRouter >
				<App />
		</HashRouter>
	</Provider>
);
