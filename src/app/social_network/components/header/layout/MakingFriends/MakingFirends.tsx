import { Div } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivItems, DivMenu, DivOptions, DivResults, DivSearch, Input } from './styleMakingFriends';
import TagProfle from '~/reUsingComponents/TagProfile/TagProfle';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
export interface PropsTextFriends {
    option: string[];
    menu: string[];
    main: string;
}
interface PropsMakingFriends {
    friends: PropsTextFriends;
    colorText: string;
    colorBg: number;
}
const MakingFriends: React.FC<PropsMakingFriends> = ({ friends, colorText, colorBg }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string[]>([]);
    const optionS = friends.option;
    const menu = friends.menu;
    const css = `    display: flex;
            align-items: center;
            padding: 4px 6px;
           background-color: #5e5e5e;
            color: #cbcbcb;
            cursor: var(--pointer);
            border-radius: 5px;
            font-size: 1.3rem;
            font-weight: 400;
          `;
    const cssImage = `
                    width: 53px;
                    height: 40px;
                    margin-right: 5px;
                    cursor: var(--pointer); 
                    @media (min-width: 769px){
                            width: 100%;
                            height: 170px;
                            margin-right: 0;
                            img{border-radius: 5px 5px 0 0 !important; }
                    }
                    img{border-radius: 50% ;}`;
    console.log(search);
    const handleOption = (e: any, i: string) => {
        if (e.target.getAttribute('id') !== 'not') {
            if (search.lastIndexOf(i) >= 0) {
                search.splice(search.indexOf(i), 1);
                setSearch([...search]);
            } else {
                setSearch([...search, i]);
            }
        }
    };
    return (
        <DivOptions bg={colorBg === 1 ? '#373737' : ''} color={colorText}>
            <DivSearch>
                {optionS.map((i) => (
                    <DivItems
                        display="flex"
                        css={`
                            padding: 4px;
                            ${search.includes(i)
                                ? 'width: 100%;'
                                : search.length > 0
                                ? 'width: 0%; display: none; '
                                : 'width: 100%; '};
                            transition: all 0.2s linear;
                            ${search.includes(i)
                                ? ' input {display: block; width: 100%; transition: all 0.5s linear;} div {width: 25%; transition: all 0.5s linear;}'
                                : 'input {display: none; width: 0%;} div {width: 100%;}'};
                            @media (min-width: 600px) {
                                ${search.includes(i)
                                    ? 'width: 100%;'
                                    : search.length > 1
                                    ? 'width: 0%; '
                                    : 'width: 15%; display: block; '};
                            }
                            @media (min-width: 769px) {
                                width: 100%;
                                padding: 4px;
                            }
                        `}
                        key={i}
                        onClick={(e) => handleOption(e, i)}
                    >
                        <Input id="not" type="text" placeholder={i} color={colorText} />
                        <DivItems>{i}</DivItems>
                    </DivItems>
                ))}
            </DivSearch>
            <Div css="height: 94%">
                <DivMenu>
                    {menu.map((m) => (
                        <DivItems key={m}>{m}</DivItems>
                    ))}
                </DivMenu>
                <Div width="100%" css="position: relative;">
                    <DivResults>
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                border: 1px solid #414141;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }

                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    background-color: #292a2c;
                                    box-shadow: 0 0 5px #7b797987;
                                    padding: 0 0 12px;
                                    border-radius: 5px;
                                    border: none;
                                }
                            `}
                        >
                            <TagProfle
                                profile
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: '3f132816-bb9d-4579-a396-02ab5680f4f4',
                                    avatar: 'https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg',
                                    fullName: 'Nguyễn Trọng Hùng',
                                    nickName: 'I want you back',
                                    gender: 1,
                                }}
                            />
                        </Div>{' '}
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                border: 1px solid #414141;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }
                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    background-color: #292a2c;
                                    box-shadow: 0 0 5px #7b797987;
                                    padding: 0 0 12px;
                                    border-radius: 5px;
                                    border: none;
                                }
                            `}
                        >
                            <TagProfle
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: 'd',
                                    avatar: 'https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg',
                                    fullName: 'Nguyễn Trọng Hùng',
                                    nickName: 'Fuck Boy:)',
                                    gender: 1,
                                }}
                            />
                        </Div>{' '}
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                border: 1px solid #414141;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }
                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    background-color: #292a2c;
                                    box-shadow: 0 0 5px #7b797987;
                                    padding: 0 0 12px;
                                    border-radius: 5px;
                                    border: none;
                                }
                            `}
                        >
                            <TagProfle
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: 'd',
                                    avatar: 'https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg',
                                    fullName: 'Nguyễn Trọng Hùng',
                                    nickName: 'Fuck Boy:)',
                                    gender: 1,
                                }}
                            />
                        </Div>{' '}
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                border: 1px solid #414141;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }
                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    background-color: #292a2c;
                                    box-shadow: 0 0 5px #7b797987;
                                    padding: 0 0 12px;
                                    border-radius: 5px;
                                    border: none;
                                }
                            `}
                        >
                            <TagProfle
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: 'd',
                                    avatar: 'https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg',
                                    fullName: 'Nguyễn Trọng Hùng',
                                    nickName: 'Fuck Boy:)',
                                    gender: 1,
                                }}
                            />
                        </Div>{' '}
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                border: 1px solid #414141;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }
                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    background-color: #292a2c;
                                    box-shadow: 0 0 5px #7b797987;
                                    padding: 0 0 12px;
                                    border-radius: 5px;
                                    border: none;
                                }
                            `}
                        >
                            <TagProfle
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: 'd',
                                    avatar: 'https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg',
                                    fullName: 'Nguyễn Trọng Hùng',
                                    nickName: 'Fuck Boy:)',
                                    gender: 1,
                                }}
                            />
                        </Div>{' '}
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                border: 1px solid #414141;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }
                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    background-color: #292a2c;
                                    box-shadow: 0 0 5px #7b797987;
                                    padding: 0 0 12px;
                                    border-radius: 5px;
                                    border: none;
                                }
                            `}
                        >
                            <TagProfle
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: 'd',
                                    avatar: 'https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg',
                                    fullName: 'Nguyễn Trọng Hùng',
                                    nickName: 'Fuck Boy:)',
                                    gender: 1,
                                }}
                            />
                        </Div>{' '}
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                border: 1px solid #414141;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }
                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    background-color: #292a2c;
                                    box-shadow: 0 0 5px #7b797987;
                                    padding: 0 0 12px;
                                    border-radius: 5px;
                                    border: none;
                                }
                            `}
                        >
                            <TagProfle
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: 'd',
                                    avatar: 'https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg',
                                    fullName: 'Nguyễn Trọng Hùng',
                                    nickName: 'Fuck Boy:)',
                                    gender: 1,
                                }}
                            />
                        </Div>
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }
                                border: 1px solid #414141;
                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    box-shadow: 0 0 5px #7b797987;
                                    background-color: #292a2c;
                                    border-radius: 5px;
                                    padding: 0 0 12px;
                                }
                            `}
                        >
                            <TagProfle
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: 'd',
                                    avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ef235af8-b407-482f-be87-a165aee8ded4/dfnfd4l-8bd73f90-fef7-49b5-a668-5c4e4af924da.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VmMjM1YWY4LWI0MDctNDgyZi1iZTg3LWExNjVhZWU4ZGVkNFwvZGZuZmQ0bC04YmQ3M2Y5MC1mZWY3LTQ5YjUtYTY2OC01YzRlNGFmOTI0ZGEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Zgug8jUIQTng_sMchfL3uKfEi8-NK6Y8jB6KYYxNaqU',
                                    fullName: 'Anime',
                                    nickName: 'hello world:)',
                                    gender: 1,
                                }}
                            />
                        </Div>
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                border: 1px solid #414141;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }
                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    background-color: #292a2c;
                                    box-shadow: 0 0 5px #7b797987;
                                    border-radius: 5px;
                                    padding: 0 0 12px;
                                }
                            `}
                        >
                            <TagProfle
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: 'd',
                                    avatar: 'https://i.pinimg.com/564x/13/7a/f5/137af5f795739f4250419860c86ce491.jpg',
                                    fullName: 'No name',
                                    nickName: 'hello world:)',
                                    gender: 1,
                                }}
                            />
                        </Div>
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                border: 1px solid #414141;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }
                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    background-color: #292a2c;
                                    box-shadow: 0 0 5px #7b797987;
                                    border-radius: 5px;
                                    padding: 0 0 12px;
                                }
                            `}
                        >
                            <TagProfle
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: 'd',
                                    avatar: 'https://i.pinimg.com/originals/e6/a3/08/e6a3087f683943180dfe0fe069255c7c.jpg',
                                    fullName: 'Ati fime',
                                    nickName: 'hello world:)',
                                    gender: 1,
                                }}
                            />
                        </Div>
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                border: 1px solid #414141;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }
                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    background-color: #292a2c;
                                    box-shadow: 0 0 5px #7b797987;
                                    border-radius: 5px;
                                    padding: 0 0 12px;
                                }
                            `}
                        >
                            <TagProfle
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: 'd',
                                    avatar: 'https://yt3.googleusercontent.com/mm2-5anuZ6ghmK2zL6QM7wciD6kuupOfOagiAh5vZE1hx9tRhKEXTAExZUUY4PVq2RSw9jBpBQ=s900-c-k-c0x00ffffff-no-rj',
                                    fullName: 'Son Tung MTP',
                                    nickName: 'hello world:)',
                                    gender: 1,
                                }}
                            />
                        </Div>
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                border: 1px solid #414141;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }
                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    background-color: #292a2c;
                                    box-shadow: 0 0 5px #7b797987;
                                    border-radius: 5px;
                                    padding: 0 0 12px;
                                }
                            `}
                        >
                            <TagProfle
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: 'd',
                                    avatar: 'https://yt3.googleusercontent.com/mm2-5anuZ6ghmK2zL6QM7wciD6kuupOfOagiAh5vZE1hx9tRhKEXTAExZUUY4PVq2RSw9jBpBQ=s900-c-k-c0x00ffffff-no-rj',
                                    fullName: 'Son Tung MTP',
                                    nickName: 'hello world:)',
                                    gender: 1,
                                }}
                            />
                        </Div>
                        <Div
                            css={`
                                width: 90%;
                                height: 100px;
                                padding: 5px;
                                border: 1px solid #414141;
                                margin: 10px;
                                transition: all 0.2s linear;
                                &:hover {
                                    box-shadow: 0 0 8px #6a48bc;
                                }
                                @media (min-width: 480px) {
                                    width: 306px;
                                }
                                @media (min-width: 769px) {
                                    width: 190px;
                                    height: fit-content;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    text-align: center;
                                    background-color: #292a2c;
                                    box-shadow: 0 0 5px #7b797987;
                                    border-radius: 5px;
                                    padding: 0 0 12px;
                                }
                            `}
                        >
                            <TagProfle
                                button={[
                                    { text: 'Remove', css: css },
                                    { text: 'Add friend', css: css + ' background-color: #366ab3; ' },
                                ]}
                                cssImage={cssImage}
                                data={{
                                    id: 'd',
                                    avatar: 'https://yt3.googleusercontent.com/mm2-5anuZ6ghmK2zL6QM7wciD6kuupOfOagiAh5vZE1hx9tRhKEXTAExZUUY4PVq2RSw9jBpBQ=s900-c-k-c0x00ffffff-no-rj',
                                    fullName: 'Son Tung MTP',
                                    nickName: 'hello world:)',
                                    gender: 1,
                                }}
                            />
                        </Div>
                    </DivResults>
                </Div>
            </Div>
        </DivOptions>
    );
};
export default MakingFriends;
