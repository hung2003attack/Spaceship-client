import clsx from 'clsx';
import Buttons from '~/reUsingComponents/Buttoms/Buttom';
import styles from './header.module.scss';
import { Routes, Route } from 'react-router-dom';
import { routeheaders } from '~/routes/routeStudy/routes';
const Hearder: React.FC = () => {
    return (
        <>
            <div className={clsx(styles.header)}>
                <Buttons to="/SD" h homeCl />
                <Buttons to="/SD/personalPage" p personalPageCl src="" alt="" />
            </div>
            <Routes>
                {routeheaders.map(({ path, Component }, index) => (
                    <Route key={index} path={path} element={<Component />} />
                ))}
            </Routes>
        </>
    );
};

export default Hearder;
