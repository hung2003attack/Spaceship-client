import clsx from 'clsx';
import React from 'react';
import styles from './searchWeb.module.scss';
interface Props {
    check: boolean;
}
const SearchWeb: React.FC<Props> = ({ check }) => {
    return (
        <div className={clsx(styles.search)}>
            <input className={clsx({ [styles.darkShining]: check })} type="text" placeholder="search" />
        </div>
    );
};
export default SearchWeb;
