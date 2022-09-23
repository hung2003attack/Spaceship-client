import React, { ReactElement } from 'react';
import './globlestyle.scss';

interface children {
    children: ReactElement;
}
const Globalestyle: React.FC<children> = ({ children }) => {
    return children;
};

export default Globalestyle;
