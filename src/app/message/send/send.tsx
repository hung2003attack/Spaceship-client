import { CloseI, SendI, MoveI, UndoI } from '~/assets/Icons/Icons';
import { memo, useEffect } from 'react';
import clsx from 'clsx';
import styles from './send.module.scss';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import React, { useState } from 'react';
import Hovertitle from '~/reUsingComponents/HandleHover/HoverTitle';
import useDebounce from '~/reUsingComponents/hook/useDebounce';
import { DivIconMs } from '../styleMessage';
const Send: React.FC = () => {
    const [send, setSend] = useState(false);

    const [left, setlLeft] = useState<boolean>(false);
    const [bottom, setBottom] = useState<boolean>(false);
    const [move, setMove] = useState<boolean>(false);
    const [searchUser, setSearchUser] = useState<string>('');
    const [resultSearch, setResultSearch] = useState<any>([]);
    const handleShowHide = () => {
        setSend(!send);
    };
    const handleMove = () => {
        setMove(!move);
    };
    const handleUndo = () => {
        setlLeft(false);
        setBottom(false);
        setMove(false);
    };
    const debounce = useDebounce(searchUser, 500);
    useEffect(() => {
        if (!searchUser) {
            setResultSearch([]);
            return;
        }
        const fechApi = async () => {
            // const results = await userService.search(searchUser);
            // setResultSearch(results);
        };

        fechApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce]);
    const handleSearch = (e: { target: { value: string } }) => {
        setSearchUser(e.target.value);
    };
    console.log(resultSearch);

    return (
        <>
            {!send && (
                <Hovertitle
                    Tags={DivIconMs}
                    title="Send"
                    size="23px"
                    color="var(--color-dark)"
                    onClick={handleShowHide}
                >
                    <SendI />
                    <p className={clsx('miss')}>+</p>
                </Hovertitle>
            )}
            {send && (
                <div className={clsx(styles.hideResultBar, left && styles.leftMove, bottom && styles.bottomMove)}>
                    <div className={clsx(styles.search)}>
                        <div className={clsx(styles.close)} onClick={handleShowHide}>
                            <CloseI />
                        </div>
                        <input
                            className={clsx(styles.searchInput)}
                            type="text"
                            placeholder="Search"
                            onChange={handleSearch}
                        />
                        <div className={clsx(styles.bar)}></div>
                        <div className={clsx(styles.closeSearch)}>
                            <CloseI />
                        </div>
                        {move && (
                            <div className={clsx(styles.undo)} onClick={handleUndo}>
                                <UndoI />
                            </div>
                        )}
                        <div className={clsx(styles.move)} onClick={handleMove}>
                            <MoveI />
                        </div>
                        {resultSearch.length > 0 && (
                            <div className={clsx(styles.resultList)}>
                                {resultSearch.map((user: any) => (
                                    <div key={user.id} className={clsx(styles.resultSearch)}>
                                        <div className={clsx(styles.avatarearch)}>
                                            <Avatar src={user.avatar} alt={user.full_name} />
                                        </div>

                                        <div className={clsx(styles.nameSearch)}>
                                            <p className={clsx(styles.fullname)}>{user.full_name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={clsx(styles.userList)}>
                        {/* <div className={clsx(styles.user)}>
                            <div className={clsx(styles.avatar)}>
                                <Avatar
                                    src="https://thuthuatnhanh.com/wp-content/uploads/2019/05/gai-xinh-toc-ngan-facebook.jpg"
                                    alt="de"
                                />
                            </div>
                            <div className={clsx(styles.name)}>
                                <p className={clsx(styles.sendUserName)}>Nguyễn hùng</p>
                                <p className={clsx(styles.message)}>da nhan</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(Send);
