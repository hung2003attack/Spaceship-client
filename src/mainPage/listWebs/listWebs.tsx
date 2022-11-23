import React, { ReactElement, ReactNode } from 'react';
import { DivPage, Ptitle } from './styleListWeb';
import { StyledComponent } from 'styled-components';
import { LinkProps } from 'react-router-dom';

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
    darkShining: boolean;
}
const NextListWeb: React.FC<PropsListWeb> = ({ data, darkShining }) => {
    return (
        <>
            {data.map((V) => {
                return (
                    <V.Tag
                        key={V.name}
                        to={V.link}
                        onClick={V.next}
                        color={darkShining ? 'rgb(144 144 144)' : 'rgb(22, 22, 22)'}
                    >
                        <DivPage>{V.icon}</DivPage>
                        <Ptitle>{V.name}</Ptitle>
                    </V.Tag>
                );
            })}
        </>
    );
};
export default NextListWeb;
