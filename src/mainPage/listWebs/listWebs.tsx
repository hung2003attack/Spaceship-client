import React from 'react';
import clsx from 'clsx';
import styles from './listWeb.module.scss';
import { BookI, WorkI, NewI } from '~/assets/Icons/Icons';

interface Props {
    Tag1: any;
    Tag2: any;
    Tag3: any;
    nextWebsite: boolean;
    hanNextWebsite1: () => void;
    hanNextWebsite2: () => void;
    hanNextWebsite3: () => void;
    darkShining: boolean;
}
const NextListWeb: React.FC<Props> = ({
    Tag1,
    Tag2,
    Tag3,
    nextWebsite,
    hanNextWebsite1,
    hanNextWebsite2,
    hanNextWebsite3,
    darkShining,
}) => {
    console.log(darkShining);

    return (
        <>
            <Tag1
                to={nextWebsite ? undefined : '/SN'}
                onClick={hanNextWebsite1}
                connectworld="false"
                darkShining={darkShining}
            >
                <div className={clsx(styles.website)}>
                    <NewI />
                </div>
                <p className={clsx(styles.title)}>News</p>
            </Tag1>
            <Tag2
                to={nextWebsite ? undefined : '/SD'}
                onClick={hanNextWebsite2}
                connectworld="false"
                darkShining={darkShining}
            >
                <div className={clsx(styles.website)}>
                    <BookI />
                </div>
                <p className={clsx(styles.title)}>Study</p>
            </Tag2>
            <Tag3
                to={nextWebsite ? undefined : '/W'}
                onClick={hanNextWebsite3}
                connectworld="false"
                darkShining={darkShining}
            >
                <div className={clsx(styles.website)}>
                    <WorkI />
                </div>
                <p className={clsx(styles.title)}>Work</p>
            </Tag3>
        </>
    );
};
export default NextListWeb;
