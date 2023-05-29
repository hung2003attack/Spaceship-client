import React, { useState } from 'react';
import Bar from '~/reUsingComponents/Bar/Bar';
import clsx from 'clsx';
import { BookI, WorkI, NewI, HomeI } from '~/assets/Icons/Icons';
import Button from '~/reUsingComponents/Buttoms/ListButton/Buttons';
import Hovertitle from '~/reUsingComponents/HandleHover/HoverTitle';
import styles from './listWebBar.module.scss';
import { ButtonLink, DivList } from './styleListWeb';
import Images from '~/assets/images';
import { Alogo } from '~/social_network/components/Header/styleHeader';
import { A, Div, P } from '~/reUsingComponents/styleComponents/styleDefault';
interface Props {
    handleNextStart: () => void;
    hanNextWebsite1: () => void;
    hanNextWebsite2: () => void;
    hanNextWebsite3: () => void;
    colorBg?: number;
    colorText?: string;
}

const ListWebBar: React.FC<Props> = ({
    handleNextStart,
    hanNextWebsite1,
    hanNextWebsite2,
    hanNextWebsite3,
    colorBg,
    colorText,
}) => {
    const [showNextWebsite, setShowNextWebsite] = useState<boolean>(false);
    const handleshowNextBar = () => {
        setShowNextWebsite(!showNextWebsite);
    };
    const listOptions = [
        { id: 0, part: '/', icon: <HomeI />, name: 'Home', onClick: handleNextStart },
        { id: 1, part: '/SN', icon: <NewI />, name: 'News', onClick: hanNextWebsite1 },
        { id: 2, part: '/SD', icon: <BookI />, name: 'Study', onClick: hanNextWebsite2 },
        { id: 3, part: '/W', icon: <WorkI />, name: 'Work', onClick: hanNextWebsite3 },
    ];
    const elements = () => {
        return listOptions.map((res) => (
            <ButtonLink key={res.id} to={res.part} onClick={res.onClick}>
                <div className={clsx(styles.website)}>{res.icon}</div>
                <P css="font-size: 1.5rem; position: absolute; bottom: 3px;">{res.name}</P>
            </ButtonLink>
        ));
    };
    return (
        <Div
            width="350px"
            css={`
                height: 100px;
                position: fixed;
                transition: all 0.5s linear;
                right: ${showNextWebsite ? '0' : '-350px'};
                top: 300px;
                z-index: 102;
            `}
        >
            <Div>
                <Hovertitle title="Websites" left="-59px" top="6px" colorBg={colorBg} color={colorText}>
                    <Bar
                        css="position: absolute;
                        left: 0;
                        top: 64px;
                        transform: rotate(180deg);"
                        onClick={handleshowNextBar}
                    />
                </Hovertitle>
            </Div>

            <DivList>
                <A css="min-width: 85px; height: 85px; padding: 15px; position: relative;" href="/">
                    <img src={Images.logo} alt="d" />
                </A>
                {elements()}
            </DivList>
        </Div>
    );
};
export default ListWebBar;
