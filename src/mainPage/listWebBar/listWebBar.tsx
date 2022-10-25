import React, { useState } from 'react';
import Bar from '~/reUsingComponents/Bar/Bar';
import clsx from 'clsx';
import { BookI, WorkI, NewI } from '~/assets/Icons/Icons';
import Button from '~/reUsingComponents/Buttoms/ListButton/Buttons';
import Hovertitle from '~/reUsingComponents/HandleHover/Hover';
import styles from './listWebBar.module.scss';
interface Props {
    nextWebsite: boolean;
    hanNextWebsite1: () => void;
    hanNextWebsite2: () => void;
    hanNextWebsite3: () => void;
}

const ListWebBar: React.FC<Props> = ({ nextWebsite, hanNextWebsite1, hanNextWebsite2, hanNextWebsite3 }) => {
    const [showNextWebsite, setShowNextWebsite] = useState<boolean>(false);
    const handleshowNextBar = () => {
        setShowNextWebsite(!showNextWebsite);
    };
    return (
        <div className={clsx({ [styles.nextWebsiteBar]: nextWebsite, [styles.showNextWebsite]: showNextWebsite })}>
            <Hovertitle title="Websites">
                <Bar nextBarWebsite onClick={handleshowNextBar} />
            </Hovertitle>
            <Button to={!nextWebsite ? undefined : '/SN'} onClick={hanNextWebsite1} connectworld2>
                {nextWebsite && (
                    <>
                        <div className={clsx(styles.website)}>
                            <NewI />
                        </div>
                        <p className={clsx(styles.title2)}>News</p>
                    </>
                )}
            </Button>
            <Button to={!nextWebsite ? undefined : '/SD'} onClick={hanNextWebsite2} connectworld2>
                {nextWebsite && (
                    <>
                        <div className={clsx(styles.website)}>
                            <BookI />
                        </div>
                        <p className={clsx(styles.title2)}>Study</p>
                    </>
                )}
            </Button>
            <Button to={!nextWebsite ? undefined : '/W'} onClick={hanNextWebsite3} connectworld2>
                {nextWebsite && (
                    <>
                        <div className={clsx(styles.website)}>
                            <WorkI />
                        </div>
                        <p className={clsx(styles.title2)}>Work</p>
                    </>
                )}
            </Button>{' '}
            <Button to={!nextWebsite ? undefined : '/W'} onClick={hanNextWebsite3} connectworld2>
                {nextWebsite && (
                    <>
                        <div className={clsx(styles.website)}>
                            <WorkI />
                        </div>
                        <p className={clsx(styles.title2)}>Work</p>
                    </>
                )}
            </Button>
        </div>
    );
};
export default ListWebBar;
