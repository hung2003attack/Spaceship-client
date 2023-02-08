import React, { InputHTMLAttributes, LegacyRef, memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import useDebounce from '../../../../../reUsingComponents/hook/useDebounce';

import HttpRequestUser from '~/restAPI/requestServers/socialNetwork/user';
import { CloseI } from '~/assets/Icons/Icons';
import Account from '~/social_network/Accoutns/Account';
import styles from './search.module.scss';
import Bar from '~/reUsingComponents/Bar/Bar';
import { useCookies } from 'react-cookie';

const Search: React.FC<{ title: string }> = ({ title }) => {
    const [cookies, setCookie] = useCookies(['tks']);
    const [searchUser, setSearchUser] = useState<string>('');
    const [resultSearch, setResultSearch] = useState<any>([]);
    const [hide, setHide] = useState<boolean>(false);
    const closeRef = useRef<any>();

    const debounce = useDebounce(searchUser, 500);
    useEffect(() => {
        if (!searchUser) {
            setResultSearch([]);
            return;
        }
        const fechApi = async () => {
            try {
                const results = await HttpRequestUser.getByName(cookies.tks, searchUser, {
                    id: 'id',
                    avatar: 'avatar',
                    fullName: 'fullName',
                    nickName: 'nickName',
                    gender: 'gender',
                });
                console.log(results, 'results');

                setResultSearch(results);
            } catch (err) {
                console.log(err);
            }
        };

        fechApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce]);
    const handleResultSearch = (e: any) => {
        if (e.target.value[0] !== ' ') {
            setSearchUser(e.target.value);
        }
    };
    const handleCloseSearch = () => {
        setSearchUser('');
        closeRef.current.focus();
        setResultSearch([]);
    };
    const handleShowHide = () => {
        setHide(false);
    };
    const a = [
        { id: '70363514-1ebe-424e-a722-b1bbda7bbfc3', last_name: 'hung', full_name: 'hung nguyen' },
        { id: '3f132816-bb9d-4579-a396-02ab5680f4f4', last_name: 'hung', full_name: 'hung nguyen' },
    ];
    return (
        <div className={clsx(styles.search)}>
            <input
                ref={closeRef}
                type="text"
                value={searchUser}
                placeholder={title}
                className={clsx(styles.searchInput)}
                onChange={(e) => handleResultSearch(e)}
                onFocus={handleShowHide}
            />
            <div className={clsx(styles.closeSearch)} onClick={handleCloseSearch}>
                <CloseI />
            </div>
            {resultSearch?.length > 0 && (
                <>
                    <div className={clsx(styles.resultBar, hide && styles.showHide)}>
                        <div className={clsx(styles.resultBar1)}>
                            <div className={clsx(styles.useResult)}>
                                <Account data={resultSearch} />
                            </div>
                        </div>
                        <Bar onClick={() => setHide(!hide)} hideResultSearch />
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(Search);
