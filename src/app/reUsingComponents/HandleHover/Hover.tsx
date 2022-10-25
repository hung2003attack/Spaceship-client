import React, { memo, useEffect, useRef, useState } from 'react';
import { hover, PropsImg } from './interfaceHover';
import { DivHover, DivIcon } from './styleHover';

// Hovertitle props[bắt buộc có title,[anyTags != 'p' & 'img',Tags, Class, child = con của Icon]] [ Tags = Component or icon or tag]

const Hovertitle: React.FC<hover> = ({
    //children
    children,
    //Event
    onClick,
    //href,
    href,
    to,
    //danh cho Image
    src,
    alt,
    Tags,
    //con của Tags
    child,
    // bắt buộc phải có title để làm tiêu đề hiển thi
    title,
    size,
    color,
}) => {
    const [showHidetitle, setShowHideetitle] = useState<boolean>(false);

    const tagRef = useRef<any>('div');
    console.log('hover');

    const handleHover = () => {
        setShowHideetitle(true);
    };

    const removeHover = () => {
        setShowHideetitle(false);
    };
    const onMouse = [];

    const propEvents = {
        onClick,
    };
    const propLink = {
        href,
        to,
    };
    const Propstag = Tags || 'div';
    useEffect(() => {}, []);
    return (
        <>
            <Propstag {...propLink} onMouseEnter={handleHover} onMouseLeave={removeHover} {...propEvents}>
                <DivIcon size={size} color={color}>
                    {children}
                </DivIcon>
                {showHidetitle && (
                    <DivHover>
                        <p>{title}</p>
                    </DivHover>
                )}
            </Propstag>
        </>
    );
};

export default memo(Hovertitle);
