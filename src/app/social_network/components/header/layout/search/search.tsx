import React, { InputHTMLAttributes, LegacyRef, memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import useDebounce from '../../../../../reUsingComponents/hook/useDebounce';

import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';
import { CloseI, DotI } from '~/assets/Icons/Icons';
import Account from '~/social_network/Accoutns/Account';
import styles from './search.module.scss';
import Bar from '~/reUsingComponents/Bar/Bar';
import { useCookies } from 'react-cookie';
import { DivResults, DivSearch, Input } from './styleSearch';
import { useSelector } from 'react-redux';
import { PropsBg } from 'src/mainPage/nextWeb';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import CommonUtils from '~/utils/CommonUtils';
import { Div, P } from '~/reUsingComponents/styleComponents/styleDefault';
export interface PropsSearchTextSN {
    menu: {
        name: string;
        id: number;
    }[];
}
interface PropsSearch {
    title: string;
    colorBg: number;
    colorText: string;
    location: string;
    dataText: PropsSearchTextSN;
    search: boolean;
}
const Search: React.FC<PropsSearch> = ({ location, colorBg, colorText, dataText, title, search }) => {
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
                const results = await userAPI.getByName(cookies.tks, searchUser, {
                    id: 'id',
                    avatar: 'avatar',
                    fullName: 'fullName',
                    nickName: 'nickName',
                    gender: 'gender',
                });
                console.log(results, 'results');
                results.map((result: any) => {
                    if (result.avatar) result.avatar = CommonUtils.convertBase64(result.avatar);
                });
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
    const handleCloseSearch = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
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
        <DivSearch>
            {search && (
                <>
                    <Input
                        id="notS"
                        ref={closeRef}
                        type="text"
                        color={colorText}
                        value={searchUser}
                        placeholder={title}
                        onChange={(e) => handleResultSearch(e)}
                        onFocus={handleShowHide}
                    />
                    <DivPos
                        width="30px"
                        size="1.8rem"
                        top="3.5px"
                        right="0px"
                        color={colorText}
                        onClick={handleCloseSearch}
                    >
                        <CloseI />
                    </DivPos>
                </>
            )}

            {search && resultSearch?.length > 0 && (
                <>
                    <DivResults bg={colorBg === 1 ? '#292a2d;' : ''} onClick={(e) => e.stopPropagation()}>
                        <Div wrap="wrap" css="margin-bottom: 6px; box-shadow: 0 0 3px rgb(31 29 29);">
                            <Div
                                width="100%"
                                css="margin: 2px 5px; align-items: center; justify-content: space-between"
                            >
                                <P z="1.3rem">Recently</P>
                                <Div css="cursor: pointer;">
                                    <DotI />
                                </Div>
                            </Div>
                            {/* <Input
                                type="text"
                                color={colorText}
                                placeholder={title}
                                // onChange={(e) => handleResultSearch(e)}
                                onFocus={handleShowHide}
                            /> */}
                            {/* {dataText.menu.map((res) => (
                                <Div
                                    css={`
                                        min-width: fit-content;
                                        justify-content: center;
                                        align-items: center;
                                        margin: 3px 7px;
                                        padding: 5px 7px;
                                        color: ${colorText};
                                    `}
                                >
                                    <P z="1.4rem">{res.name}</P>
                                </Div>
                            ))} */}
                        </Div>
                        <Div css="height: 91%; overflow: auto; ">
                            <Div width="100%" css="display: block;">
                                <Account data={resultSearch} location={location} />
                            </Div>
                        </Div>
                    </DivResults>
                </>
            )}
        </DivSearch>
    );
};

export default memo(Search);
