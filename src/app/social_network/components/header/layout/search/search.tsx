import React, { InputHTMLAttributes, LegacyRef, memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import useDebounce from '../../../../../reUsingComponents/hook/useDebounce';

import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';
import { CloseI, DotI, SearchI } from '~/assets/Icons/Icons';
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
    rec: string;
    menu: {
        id: number;
        title: string;
        children: { name: string; id: number }[];
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
    const [searchUserMore, setSearchUserMore] = useState<string>('');
    const [cateMore, setCateMore] = useState<string>('');
    const [resultSearch, setResultSearch] = useState<any>([]);
    const [more, setMore] = useState<React.ReactElement | null>();
    const [placeholder, setPlaceholder] = useState<string>('');
    const closeRef = useRef<any>();

    const debounce1 = useDebounce(searchUser, 500);
    const debounce2 = useDebounce(searchUserMore, 500);
    useEffect(() => {
        if (!searchUser) {
            setResultSearch([]);
            return;
        }
        const fechApi = async () => {
            try {
                const results = await userAPI.getByName(cookies.tks, searchUser, cateMore, searchUserMore, {
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
    }, [debounce1, debounce2]);
    const handleResultSearch = (e: any) => {
        if (e.target.value[0] !== ' ') {
            setSearchUser(e.target.value);
        }
    };
    const handleResultSearchMore = (e: any) => {
        if (e.target.value[0] !== ' ') {
            setSearchUserMore(e.target.value);
        }
    };
    const handleCloseSearch = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        setSearchUser('');
        setSearchUserMore('');
        setCateMore('');
        setPlaceholder('');
        closeRef.current.focus();
        setResultSearch([]);
    };
    const handleShowHide = () => {
        // setHide(false);
    };
    const a = [
        { id: '70363514-1ebe-424e-a722-b1bbda7bbfc3', last_name: 'hung', full_name: 'hung nguyen' },
        { id: '3f132816-bb9d-4579-a396-02ab5680f4f4', last_name: 'hung', full_name: 'hung nguyen' },
    ];
    const handleSearchMore = (id: number, name: string) => {
        setPlaceholder(name);
        if (id === 1) setCateMore('nickName');
    };
    const handleMore = () => {
        if (!more) {
            setMore(
                <Div width="100%" wrap="wrap" css=" margin-top: 30px;">
                    {dataText.menu.map((res) => (
                        <Div
                            key={res.title}
                            width="100%"
                            css="border: 1px solid #5a5a5a; position: relative; margin-bottom: 20px;"
                        >
                            <P z="1.3rem" css="position: absolute; top: -20px; left: 4px;">
                                {res.title}
                            </P>
                            {res.children.map((rm) => (
                                <Div
                                    key={rm.id}
                                    css={`
                                        min-width: fit-content;
                                        justify-content: center;
                                        align-items: center;
                                        padding: 5px 7px;
                                        cursor: var(--pointer);
                                        color: ${colorText};
                                    `}
                                    onClick={() => {
                                        if (res.id === 1) handleSearchMore(rm.id, rm.name);
                                    }}
                                >
                                    <P z="1.4rem">{rm.name}</P>
                                </Div>
                            ))}
                        </Div>
                    ))}
                </Div>,
            );
        } else {
            setMore(null);
            setPlaceholder('');
        }
    };
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

            {search && (resultSearch?.length > 0 || cateMore) && (
                <>
                    <DivResults bg={colorBg === 1 ? '#292a2d;' : ''} onClick={(e) => e.stopPropagation()}>
                        <Div wrap="wrap" css="margin-bottom: 6px; box-shadow: 0 0 3px rgb(31 29 29);">
                            <Div
                                width="100%"
                                css="margin: 2px 5px; align-items: center; justify-content: space-between"
                            >
                                <P z="1.3rem">{placeholder ? <SearchI /> : dataText.rec}</P>
                                {placeholder && (
                                    <Input
                                        type="text"
                                        color={colorText}
                                        placeholder={placeholder}
                                        onChange={handleResultSearchMore}
                                        onFocus={handleShowHide}
                                    />
                                )}
                                <Div css="cursor: pointer;" onClick={handleMore}>
                                    <DotI />
                                </Div>
                            </Div>
                            {more}

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
                                {resultSearch.length > 0 ? (
                                    <Account data={resultSearch} location={location} />
                                ) : (
                                    <P>{dataText.rec === 'Recently' ? 'No one of this name' : 'Không tìm thấy'}</P>
                                )}
                            </Div>
                        </Div>
                    </DivResults>
                </>
            )}
        </DivSearch>
    );
};

export default memo(Search);
