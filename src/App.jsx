
import { useSelector } from 'react-redux';
import { Navigate,Route, Routes } from 'react-router-dom';

import { OrangeBackground } from './components/layouts/backgrounds/orange-background';
import { LayoutBookPage } from './components/layouts/book-page';
import { MainLayout } from './components/layouts/main/main';
import { NavigationLayout } from './components/layouts/navigation';
import { LayoutTerms } from './components/layouts/terms/terms';
import { Auth } from './components/pages/authorization/auth';
import { Register } from './components/pages/authorization/register';
import { Books } from './components/pages/books';
import { RecoveryRequest } from './components/pages/forgot-pass/recovery-request';
import { CLIENT_URL_PATHNAMES } from './utils/url-pathnames';

export const App = () => { 
	const { authUser } = useSelector(state => state.auth);
	
	return (
		<Routes>
			<Route path='/' element={<MainLayout /> }>
				<Route element={<NavigationLayout />}>
					<Route path='/' element={authUser ? <Navigate to='books/all' /> : <Navigate to={CLIENT_URL_PATHNAMES.AUTH} />} />
					<Route path='books/:category' element={authUser ? <Books /> : <Navigate to={CLIENT_URL_PATHNAMES.AUTH} />} />
					<Route path='terms' element={<LayoutTerms contentView='terms' />} />
					<Route path='contract' element={<LayoutTerms contentView='contract' />} /> 
				</Route>
			</Route>

			<Route path='/' element={<OrangeBackground />}>
				<Route  path={CLIENT_URL_PATHNAMES.AUTH} element={authUser ? <Navigate to='/' /> : <Auth />} />
				<Route path={CLIENT_URL_PATHNAMES.REGISTER} element={authUser ? <Navigate to='/' /> : <Register />} />
				<Route path={CLIENT_URL_PATHNAMES.FORGOT_PASS} element={authUser ? <Navigate to='/' /> : <RecoveryRequest />} /> 
				<Route path='/books/:category/:id' element={<LayoutBookPage />} />
			</Route>

			<Route path='*' element={<h2> Not found</h2>} /> 
    </Routes>
	)
}