import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './components/App/App';
import i18n from './i18n.ts';
import { UserProvider } from './context/UserContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import {NotificationProvider} from "src/context/NotificationContext.tsx";
// import theme from './theme'; // Your custom theme if needed

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
			<I18nextProvider i18n={i18n}>
				<BrowserRouter>
					<UserProvider>
					<NotificationProvider>
						<App />
					</NotificationProvider>
					</UserProvider>
				</BrowserRouter>
			</I18nextProvider>
	</React.StrictMode>
);
