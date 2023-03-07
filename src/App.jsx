
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

export const App = () => { 
	const { loginUser } = useSelector(state => state.auth);
	
	return (
		<Routes>
			<Route path='/' element={<MainLayout /> }>
				<Route element={<NavigationLayout />}>
					<Route path='/' element={loginUser ? <Navigate to='books/all' /> : <Navigate to='auth' />} />
					<Route path='books/:category' element={loginUser ? <Books /> : <Navigate to='auth' />} />
					<Route path='terms' element={<LayoutTerms contentView='terms' />} />
					<Route path='contract' element={<LayoutTerms contentView='contract' />} /> 
				</Route>
			</Route>

			<Route path='/' element={<OrangeBackground />}>
				<Route  path='auth' element={loginUser ? <Navigate to='/' /> : <Auth />} />
				<Route path='register' element={loginUser ? <Navigate to='/' /> : <Register />} />
				<Route path='forgot-pass' element={loginUser ? <Navigate to='/' /> : <RecoveryRequest />} /> 
				<Route path='/books/:category/:id' element={<LayoutBookPage />} />
			</Route>

			<Route path='*' element={<div> not found</div>} /> 
    </Routes>
	)
}