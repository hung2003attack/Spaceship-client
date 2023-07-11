import styled from 'styled-components';

export const DivSwiper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .swiper-slide,
    swiper-slide {
        width: 33.2% !important;
    }
    .swiper,
    swiper-container {
        position: unset !important;
        overflow: unset !important;
    }
    .swiper-pagination {
        top: unset !important;
        bottom: -1px;
        height: 1px !important;
    }
    .swiper-wrapper {
        align-items: center;
    }
    ${(props: { css?: string }) => props.css}
`;
export const InputT = styled.input`
    width: 100%;
    padding: 3px;
    margin: 5px 0;
    background-color: transparent;
    color: aliceblue;
`;
