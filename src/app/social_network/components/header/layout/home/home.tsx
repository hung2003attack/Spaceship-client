import clsx from 'clsx';
import { Fragment, Key, memo, useEffect, useRef, useState } from 'react';
import {
    Div,
    DivForm,
    DivNews,
    DivSignature,
    DivOptions,
    DivUpImage,
    DivUpNews,
    Form,
    Input,
    Label,
    DivItems,
} from './styleHome';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import HttpRequestHome from '~/restAPI/requestServers/socialNetwork/home';
import { ImageI, SignatureI, TextI } from '~/assets/Icons/Icons';
import { PropsBg } from 'src/mainPage/nextWeb';
import Bar from '~/reUsingComponents/Bar/Bar';

const Home: React.FC<{ colorBg: string; colorText: string }> = ({ colorBg, colorText }) => {
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['tks', 'k_user']);
    const token = cookies.tks;
    const k_user = cookies.k_user;
    // if (!k_user) removeCookie('tks');
    console.log('cookie token home', cookies.tks);

    useEffect(() => {
        const data = HttpRequestHome.news(token, dispatch);
    }, []);

    const [userList, setUserList] = useState();
    const upLoadRef = useRef<any>();
    const [upLoad, setUpLoad] = useState<any>([]);
    const [moveForm, setMoveForm] = useState<boolean>(false);
    const handleUpload = (e: any) => {
        const file = e.target.files;
        console.log(e.target.files.length);
        if (file.length > 0) {
            for (let i = 0; i < file.length; i++) {
                console.log(file[i]);
                const url = URL.createObjectURL(file[i]);
                console.log(url);
                if (url) {
                    if (upLoad.length < 1) {
                        setUpLoad([url]);
                        console.log(upLoad.length);
                    }
                    if (upLoad.length >= 1) {
                        console.log(upLoad.length + '2');
                        upLoad.push(url);
                    }
                }
            }
        }
    };
    console.log(upLoad);

    console.log('home');

    return (
        <Div bg={colorBg}>
            <DivForm top="12px">
                <Form encType="multipart/form-data">
                    <DivUpNews>
                        <DivOptions>
                            <DivItems color={colorText}>
                                <TextI />
                            </DivItems>
                            <DivItems>
                                <input id="upload" type="file" name="file[]" onChange={handleUpload} multiple hidden />
                                <Label htmlFor="upload" color={colorText}>
                                    <ImageI />
                                </Label>
                            </DivItems>
                            {/* <DivSignature>
                                <SignatureI />
                            </DivSignature> */}
                        </DivOptions>
                    </DivUpNews>
                    <Bar
                        css="
                        position: absolute;
                        bottom: 0;
                        right: 50%;
                        left: 50%;
                        transform: rotate(90deg) translate(-50%, -50%);
                    "
                    />
                </Form>
            </DivForm>
            {upLoad.length > 0 &&
                upLoad.map((image: any, index: Key | null | undefined) => <img key={index} src={image[0].name} />)}
            <DivNews>Xin chào mọi nguòi</DivNews>
            <DivNews>Xin chào mọi nguòi</DivNews>
            <DivNews>Xin chào mọi nguòi</DivNews>
            <DivNews>Xin chào mọi nguòi</DivNews>
        </Div>
    );
};

export default memo(Home);
