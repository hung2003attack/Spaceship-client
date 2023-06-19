import React from 'react';
import { memo } from 'react';

import { socialnetwork } from 'src/dataMark/dateTextSocialNetWork';
import Socialnetwork from '~/social_network';
import Study from '~/study';

interface PropsCPage {
    currentPage: number;
    listPage: boolean;
    dataUser: { avatar: string; fullName: string; gender: number };
}
const currentPageL: React.FC<PropsCPage> = ({ currentPage, listPage, dataUser }) => {
    if (listPage) {
        return currentPage === 1 ? (
            <Socialnetwork data={socialnetwork} dataUser={dataUser} />
        ) : currentPage === 2 ? (
            <Study />
        ) : (
            <div>hello personal</div>
        );
    }

    return <></>;
};
export default currentPageL;
