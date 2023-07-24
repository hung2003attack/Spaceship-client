import { LanguageI } from '~/assets/Icons/Icons';

export const socialnetwork = {
    vi: {
        header: {
            logo: 'Trang Chính',
            sett: 'Cài Đặt',

            home: {
                title: 'Trang Chủ',
                children: {
                    userBar: {
                        contentFirst: 'Chào mừng bạn quay lại!',
                        contentTwo: '',
                    },
                    form: {
                        textarea: 'Bạn đang nghĩ gì?',
                        buttonOne: 'Huỷ bỏ',
                        buttonTwo: 'Tiếp tục',
                        emoji: 'vi',
                        preView: {
                            time: {
                                hour: 'giờ',
                                minute: 'phút',
                                second: 'giây',
                            },
                            buttonFirst: 'Huỷ bỏ',
                            buttonTwo: 'Đăng bài',
                        },
                    },
                },
            },
            exchange: ' Giao Lưu',
            video: 'Gọi Video',
            search: {
                title: 'Tìm kiếm',
                children: {
                    rec: 'Vừa qua',
                    menu: [
                        {
                            id: 1,
                            title: 'Tìm kiếm',
                            children: [{ name: 'Nick-name', id: 1 }],
                        },
                        {
                            id: 2,
                            title: 'Loại',
                            children: [
                                { name: 'Người dùng', id: 1 },
                                { name: 'Bài đăng', id: 2 },
                                { name: 'Exchanges', id: 3 },
                            ],
                        },
                    ],
                },
            },
            friends: {
                title: 'Bạn bè',
                children: {
                    menu: [
                        { name: 'Chưa kết bạn', id: 'strangers' },
                        { name: 'Đã kêt bạn', id: 'friends' },
                        { name: 'Gia đình', id: 'family' },
                        { name: 'Bạn đã gửi', id: 'yousent' },
                        { name: 'Người khác gửi', id: 'otherssent' },
                    ],
                },
            },
            location: 'SN',
        },
        sett: {
            data: {
                data: [
                    {
                        title: 'Ngôn Ngữ',
                        icon: <LanguageI />,
                        children: {
                            data: [
                                { name: 'English', lg: 'en' },
                                { name: 'VietNamese', lg: 'vi' },
                            ],
                        },
                    },
                    {
                        title: 'Đăng Xuất',
                        logout: true,
                    },
                ],
            },
        },
        body: {},
    },
    en: {
        header: {
            logo: 'Spaceship',
            sett: 'Setting',

            home: {
                title: 'Home',
                children: {
                    userBar: {
                        contentFirst: 'Welcome back!',
                        contentTwo: 'We are always by your side',
                    },
                    form: {
                        textarea: "What's on your mind?",
                        buttonOne: 'Abolish',
                        buttonTwo: 'Continue',
                        emoji: 'en',
                        preView: {
                            time: {
                                hour: 'h',
                                minute: 'm',
                                second: 's',
                            },
                            buttonFirst: 'Abolish',
                            buttonTwo: 'Post',
                        },
                    },
                },
            },
            exchange: 'Exchange',
            video: 'Call Video',
            search: {
                title: 'Search',
                children: {
                    rec: 'Recently',
                    menu: [
                        {
                            id: 1,
                            title: 'Search-more',
                            children: [{ name: 'Nick-name', id: 1 }],
                        },
                        {
                            id: 2,
                            title: 'Choose',
                            children: [
                                { name: 'Users', id: 1 },
                                { name: 'Posts', id: 2 },
                                { name: 'Exchanges', id: 3 },
                            ],
                        },
                    ],
                },
            },
            friends: {
                title: 'Friends',
                children: {
                    menu: [
                        { name: 'Not Friends', id: 'strangers' },
                        { name: 'Friends', id: 'friends' },
                        { name: 'Family', id: 'family' },
                        { name: 'You sent', id: 'yousent' },
                        { name: 'others sent', id: 'otherssent' },
                    ],
                },
            },
            location: 'SN',
        },
        sett: {
            data: {
                data: [
                    {
                        title: 'Language',
                        icon: <LanguageI />,
                        children: {
                            data: [
                                { name: 'English', lg: 'en' },
                                { name: 'VietNamese', lg: 'vi' },
                            ],
                        },
                    },
                    {
                        title: 'Log Out',
                        logout: true,
                    },
                ],
            },
        },
        body: {},
    },
};
