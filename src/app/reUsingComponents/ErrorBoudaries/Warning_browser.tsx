import moment from 'moment';
import { useState, useEffect } from 'react';

import { Buttons, Div, H3, P, Strong } from '../styleComponents/styleDefault';
import { DivInBs, DivWarBs } from './stylesErrorBoudaries';
import { CloseI } from '~/assets/Icons/Icons';
import { DivPos } from '../styleComponents/styleComponents';
import 'moment/locale/vi';
import { useSelector } from 'react-redux';

export interface PropsLanguage {
    persistedReducer: {
        language: {
            sn: string;
            l: string;
            w: string;
        };
    };
}

const WarningBrowser: React.FC<{
    warningBros: {
        dateTime: string;
        err: number;
        prohibit: boolean;
    };
    setWarningBrs: React.Dispatch<
        React.SetStateAction<
            | {
                  dateTime: string;
                  err: number;
                  prohibit: boolean;
              }
            | undefined
        >
    >;
    currentPage: number;
}> = ({ warningBros, setWarningBrs, currentPage }) => {
    const [prohibit, setProhibit] = useState<boolean>(false);
    const language = useSelector((state: PropsLanguage) => state.persistedReducer.language);
    const lg = currentPage === 1 ? language.sn : currentPage === 2 ? language.l : language.w;

    const handleAccess = () => {};
    const handleProhibit = () => {
        setProhibit(true);
    };

    const handleNo = () => {
        setProhibit(false);
    };
    const handleYes = () => {};
    console.log();
    const dateTime = moment(warningBros.dateTime, 'HH:mm:ss DD-MM-YYYY').locale(lg).fromNow();
    const en = moment(warningBros.dateTime, 'HH:mm:ss DD-MM-YYYY').locale(lg).format('LLLL');
    const text: {
        [en: string]: {
            first: React.ReactElement;
            second: string;
            buttonF: { first: string; second: string };
            buttonT: { first: string; second: string };
        };
        vi: {
            first: React.ReactElement;
            second: string;
            buttonF: { first: string; second: string };
            buttonT: { first: string; second: string };
        };
    } = {
        en: {
            second: "If really it's not you. We will prohibit that user!",
            first: (
                <P z="1.4rem" css="width: 100%; font-size: 1.4rem; margin-bottom: 15px;">
                    Your account has used from an another place!{' '}
                    <Strong>
                        At about {dateTime}. {en}. Is it you?
                    </Strong>
                </P>
            ),
            buttonF: {
                first: "No. It's not me!",
                second: "Yes. It's me!",
            },
            buttonT: {
                first: 'No!',
                second: 'Yes',
            },
        },
        vi: {
            second: 'Nếu đó không phải là bạn. Chúng tôi sẽ ngăn chặn người dùng đã đăng nhập trước đó!',
            first: (
                <P z="1.4rem" css="width: 100%; font-size: 1.4rem; margin-bottom: 15px;">
                    Tài khoản của bạn đã được sử dụng ở một lơi khác!
                    <Strong>
                        {' '}
                        vào lúc {dateTime}. {en}. Đó có phải là bạn không?
                    </Strong>
                </P>
            ),
            buttonF: {
                first: 'Không phải tôi!',
                second: 'Đúng vậy là tôi!',
            },
            buttonT: {
                first: 'Không!',
                second: 'Đồng ý',
            },
        },
    };
    return (
        <DivWarBs id="exBros">
            <DivInBs>
                <DivPos size="20px" right="10px" onClick={() => setWarningBrs(undefined)}>
                    <CloseI />
                </DivPos>
                <H3 css="color: #fa2a2a; font-size: 2rem;}">Warning!</H3>

                {prohibit ? text[lg].second : text[lg].first}
                <Div css="justify-content: space-evenly;">
                    {prohibit ? (
                        <Buttons
                            text={[
                                {
                                    css: 'color: #333; padding: 6px 9px; font-size: 1.3rem; background-color: #e766668f',
                                    text: text[lg].buttonT.first,
                                    onClick: handleNo,
                                },
                                {
                                    css: 'color: #333; padding: 6px 9px; font-size: 1.3rem; background-color: #8cd18c;',
                                    text: text[lg].buttonT.second,
                                    onClick: handleYes,
                                },
                            ]}
                        />
                    ) : (
                        <Buttons
                            text={[
                                {
                                    css: 'color: #333; padding: 6px 9px; font-size: 1.3rem; background-color: #e766668f',
                                    text: text[lg].buttonF.first,
                                    onClick: handleProhibit,
                                },
                                {
                                    css: 'color: #333; padding: 6px 9px; font-size: 1.3rem; background-color: #8cd18c;',
                                    text: text[lg].buttonF.second,
                                    onClick: handleAccess,
                                },
                            ]}
                        />
                    )}
                </Div>
            </DivInBs>
        </DivWarBs>
    );
};
export default WarningBrowser;
