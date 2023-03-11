import { CLIENT_URL_PATHNAMES } from './url-pathnames';

export const checkAppIsAtRegistrationURL = () => window.location.hash.includes(`/${CLIENT_URL_PATHNAMES.REGISTRATION}`) ?? false