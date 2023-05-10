import React, { ReactElement, ReactNode } from 'react';
import { DivPage, Ptitle } from './styleListWeb';
import { StyledComponent } from 'styled-components';
import { LinkProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PropsBg } from '../nextWeb';

export interface PropsListWeb {
    data: {
        Tag: StyledComponent<
            React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>,
            any,
            {},
            never
        >;
        link: string;
        next: () => void;
        name: string;
        icon: JSX.Element;
    }[];
}
const NextListWeb: React.FC<PropsListWeb> = ({ data }) => {
    const { colorBg } = useSelector((state: PropsBg) => state.persistedReducer.background);
    return (
        <>
            {data.map((V) => {
                return (
                    <V.Tag key={V.name} to={V.link} onClick={V.next} color={colorBg === 1 ? '#202124f5' : ''}>
                        <DivPage>{V.icon}</DivPage>
                        <Ptitle>{V.name}</Ptitle>
                    </V.Tag>
                );
            })}
        </>
    );
};
export default NextListWeb;
