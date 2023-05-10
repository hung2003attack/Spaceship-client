import React, { InputHTMLAttributes, LegacyRef, memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import useDebounce from '../../../../../reUsingComponents/hook/useDebounce';

import HttpRequestUser from '~/restAPI/requestServers/accountRequest/user';
import { CloseI } from '~/assets/Icons/Icons';
import Account from '~/social_network/Accoutns/Account';
import styles from './search.module.scss';
import Bar from '~/reUsingComponents/Bar/Bar';
import { useCookies } from 'react-cookie';
import { DivSearch, Input } from './styleSearch';
import { useSelector } from 'react-redux';
import { PropsBg } from 'src/mainPage/nextWeb';
import { DivClose } from '~/reUsingComponents/styleComponents/styleComponents';

const Search: React.FC<{ title: string; location: string; colorBg: number; colorText: string }> = ({
    title,
    location,
    colorBg,
    colorText,
}) => {
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
        <DivSearch bg={colorText}>
            <Input
                ref={closeRef}
                type="text"
                color={colorText}
                value={searchUser}
                placeholder={title}
                onChange={(e) => handleResultSearch(e)}
                onFocus={handleShowHide}
            />
            <DivClose
                width="30px"
                size="1.8rem"
                top="1.5px"
                right="-4px"
                color={colorText}
                className={clsx(styles.closeSearch)}
                onClick={handleCloseSearch}
            >
                <CloseI />
            </DivClose>
            {resultSearch?.length > 0 && (
                <>
                    <div className={clsx(styles.resultBar, hide && styles.showHide)}>
                        <div className={clsx(styles.resultBar1)}>
                            <div className={clsx(styles.useResult)}>
                                <Account data={resultSearch} location={location} />
                            </div>
                        </div>
                        <Bar
                            onClick={() => setHide(!hide)}
                            css="  position: absolute;
                                    height: 100%;
                                    width: 5px;
                                    right: -7px;
                                    top: 0;
                                    border-radius: 5px;
                                    cursor: var(--pointer);"
                        />
                    </div>
                </>
            )}
        </DivSearch>
    );
};

export default memo(Search);
