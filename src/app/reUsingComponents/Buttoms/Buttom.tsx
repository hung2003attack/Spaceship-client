import Button from './ListButton/Buttons';
import React, { memo } from 'react';

//props có [ Icon, ClassNames, Events ]

const Buttons: React.FC<any> = (props) => {
    return <Button {...props} />;
};

export default memo(Buttons);
