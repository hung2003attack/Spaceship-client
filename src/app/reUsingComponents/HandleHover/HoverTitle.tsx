import React, { memo, useEffect, useRef, useState } from 'react';
import { hover, PropsImg } from './interfaceHover';
import { DivHover, DivIcon } from './styleHover';

// Hovertitle props[bắt buộc có title,[anyTags != 'p' & 'img',Tags, Class, child = con của Icon]] [ Tags = Component or icon or tag]

const Hovertitle: React.FC<hover> = ({
    //children
    children,
    //Event
    onClick,
    onDoubleClick,
    onTouchStart,
    //href,
    href,
    to,
    //danh cho Image
    src,
    alt,
    //tag
    Tags,
    // bắt buộc phải có title để làm tiêu đề hiển thi
    title,
    size,
    color,
    colorBg,
    top,
    bottom,
    right,
    left,
    id,
}) => {
    const [showHidetitle, setShowHideetitle] = useState<boolean>(false);

    console.log('hover');
    const handleHover = () => {
        setShowHideetitle(true);
    };

    const removeHover = () => {
        setShowHideetitle(false);
    };
    const propEvents = {
        onClick,
        onDoubleClick,
        onTouchStart,
    };
    const propLink = {
        href,
        to,
    };
    const Propstag = Tags || 'div';
    useEffect(() => {}, []);
    return (
        <>
            <Propstag
                id={id}
                {...propLink}
                bg={colorBg}
                onMouseEnter={handleHover}
                onMouseLeave={removeHover}
                {...propEvents}
            >
                <DivIcon size={size} color={color}>
                    {children}
                </DivIcon>
                {showHidetitle && (
                    <DivHover
                        color={colorBg === 1 ? '#202023' : '#ffffffb8'}
                        bg={color}
                        left={left}
                        right={right}
                        top={top}
                        bottom={bottom}
                    >
                        <p>{title}</p>
                    </DivHover>
                )}
            </Propstag>
        </>
    );
};

export default memo(Hovertitle);
