import { useCookies } from 'react-cookie';

const CookiesF = () => {
    const [cookies, setCookies] = useCookies(['k_user', 'tks']);
    return { userId: cookies.k_user, token: cookies.tks };
};
export default CookiesF;
