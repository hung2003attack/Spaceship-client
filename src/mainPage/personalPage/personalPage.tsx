import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './personalPage.module.scss';
import { useDispatch } from 'react-redux';
import { offPersonalPage } from '~/redux/hideShow';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import Button from '~/reUsingComponents/Buttoms/ListButton/Buttons';
import { CloseI, DotI } from '~/assets/Icons/Icons';
import Edit from '../editInformation/editInformation';
import Part from './result/result';
import { Div, Img, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivContainer, Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import { DivPersonalPage } from '../styleNextWeb';
import { DivBg, DivIntr, DivItems, DivOp, DivPerson, DivStories } from './stypePersonal';

const Personalpage: React.FC<any> = ({ user, leng = 1 }) => {
    console.log(user);

    const dispatch = useDispatch();
    const [edit, setEdit] = useState<boolean>(false);
    const handlePersonalPage = () => {
        dispatch(offPersonalPage());
    };
    const handloEdit = () => {
        setEdit(true);
    };
    console.log('personal');
    const cssDivPersonalPage = `
    @media (min-width: 600px){
        height: 60px;
    }@media (min-width: 1000px){
        height: 80px;
    }
`;
    const cssAvatar = `min-width: 80px;
            height: 80px;
            border-radius: 50%;
            padding: 5px;
            box-shadow: 0 0 1px var(--color-dark);
            background-color: rgb(231 62 62 / 67%);
            @media (min-width: 600px){
                min-width: ${130 / (leng > 1 ? leng - 0.5 : leng) + 'px;'}
                height: ${130 / (leng > 1 ? leng - 0.5 : leng) + 'px;'}
            }@media (min-width: 1000px){
                min-width: ${150 / (leng > 1 ? leng - 0.7 : leng) + 'px;'}
                height: ${150 / (leng > 1 ? leng - 0.7 : leng) + 'px;'}
            }`;
    const cssBg = `width: 90%;
            height: 230px;
            margin: 15px auto;
            border-radius: 5px;
            background-color: rgb(200 200 200);
            img {
                border-radius: 5px;
            }
            @media (min-width: 400px){
                 height: 250px;
            }
            @media (min-width: 600px){
                  height: ${300 / (leng > 1 ? leng - 0.7 : leng) + 'px'};
            }
            @media (min-width: 769px){
                  height: ${300 / (leng > 1 ? leng - 0.7 : leng) + 'px'};
            }
            @media (min-width: 1025px){
                  height: ${400 / (leng > 1 ? leng - 0.7 : leng) + 'px'};
            };
            @media (min-width: 1201px){
                  height: ${500 / (leng > 1 ? leng - 0.7 : leng) + 'px'};
            }`;
    const cssName = ` margin-bottom: 16px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: start;
            text-align: start;
            margin-left: 16px;
            @media (min-width: 600px){
                margin-bottom: 20px;
            }`;
    const css = ` min-width: 100%;
    height: var(--full);
    overflow-y: overlay;
     @media (min-width: 1100px){
        min-width: ${100 / leng + '%;'}
    }
    @media (max-width: 600px){
        min-width: 100%;
    }`;
    return (
        <Div css={css}>
            <DivPerson>
                <Div css={cssBg}>
                    {/* {user?.background && ( */}
                    <Img
                        src="https://vaithuhayho.com/wp-content/uploads/2022/09/anh-gai-xinh-cute-50.jpg"
                        alt={user?.fullName}
                    />
                    {/* )} */}
                </Div>
                {/* <div className={clsx(styles.close)} onClick={handlePersonalPage}>
                <CloseI />
            </div> */}
                <DivPersonalPage width="90%" height="44px" margin="auto" css={cssDivPersonalPage}>
                    <Div css={cssAvatar}>
                        <Avatar
                            src="https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-facebook-tiktok.jpg"
                            alt={user?.fullName}
                            gender={user?.gender}
                            radius="50%"
                        />
                    </Div>
                    <Div css={cssName}>
                        <Hname>{user?.fullName}</Hname>
                        <p className={clsx(styles.nickName)}>{user?.nickName}I used to love you, but now will not</p>
                    </Div>
                    <div className={clsx(styles.status)}>{user?.status}</div>
                </DivPersonalPage>
                <DivIntr>
                    <DivStories>
                        <DivOp>
                            <DivItems>post</DivItems>
                            <DivItems>
                                <Button f friend />
                            </DivItems>
                        </DivOp>
                        <Part />
                        <div className={clsx(styles.results)}>hello it's my friend</div>
                    </DivStories>
                </DivIntr>
            </DivPerson>
        </Div>
    );
};
export default Personalpage;
