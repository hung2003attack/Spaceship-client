import React, { useState } from 'react';
import Bar from '~/reUsingComponents/Bar/Bar';
import clsx from 'clsx';
import { BookI, WorkI, NewI } from '~/assets/Icons/Icons';
import Button from '~/reUsingComponents/Buttoms/ListButton/Buttons';
import Hovertitle from '~/reUsingComponents/HandleHover/Hover';
import styles from './listWebBar.module.scss';
import { ButtonLink } from './styleListWeb';
interface Props {
    optionWebsite: boolean;
    hanNextWebsite1: () => void;
    hanNextWebsite2: () => void;
    hanNextWebsite3: () => void;
}

const ListWebBar: React.FC<Props> = ({ optionWebsite, hanNextWebsite1, hanNextWebsite2, hanNextWebsite3 }) => {
    const [showNextWebsite, setShowNextWebsite] = useState<boolean>(false);
    const handleshowNextBar = () => {
        setShowNextWebsite(!showNextWebsite);
    };
    const listOptions = [
        { id: 1, part: '/SN', icon: <NewI />, name: 'News', onClick: hanNextWebsite1 },
        { id: 2, part: '/SD', icon: <BookI />, name: 'Study', onClick: hanNextWebsite2 },
        { id: 3, part: '/W', icon: <WorkI />, name: 'Work', onClick: hanNextWebsite3 },
    ];
    const elements = () => {
        return listOptions.map((res) => (
            <ButtonLink key={res.id} to={res.part} onClick={res.onClick}>
                <div className={clsx(styles.website)}>{res.icon}</div>
                <p className={clsx(styles.title2)}>{res.name}</p>
            </ButtonLink>
        ));
    };
    return (
        <div className={clsx({ [styles.nextWebsiteBar]: optionWebsite, [styles.showNextWebsite]: showNextWebsite })}>
            <Hovertitle title="Websites">
                <Bar nextBarWebsite onClick={handleshowNextBar} />
            </Hovertitle>
            {elements()}
        </div>
    );
};
export default ListWebBar;
