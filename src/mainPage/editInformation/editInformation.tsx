import React from 'react';
import clsx from 'clsx';
import styles from './editInformation.module.scss';

const Edit: React.FC = () => {
    return (
        <>
            <div className={clsx(styles.editBar)}>
                <form>
                    <div className={clsx(styles.details)}>
                        <p>BirthDate:</p>
                        <input type="text" />
                    </div>
                    <div className={clsx(styles.details)}>
                        <p>Email:</p> <input type="text" />
                    </div>
                    <div className={clsx(styles.details)}>
                        <p>Phone:</p> <input type="text" />
                    </div>

                    <div className={clsx(styles.details)}>
                        <p>Adress:</p> <input type="text" />
                    </div>
                    <div className={clsx(styles.details)}>
                        <p>Gender:</p> <input type="text" />
                    </div>
                    <div className={clsx(styles.details)}>
                        <p>hobby:</p> <input type="text" />
                    </div>
                    <div className={clsx(styles.details)}>
                        <p>Strengths:</p> <input type="text" />
                    </div>
                    <div className={clsx(styles.details)}>
                        <p>Skill:</p> <input type="text" />
                    </div>
                    <div className={clsx(styles.details)}>
                        <p>Ocupation:</p> <input type="text" />
                    </div>
                </form>
            </div>
        </>
    );
};
export default Edit;
