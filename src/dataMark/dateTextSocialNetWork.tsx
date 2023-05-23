import { LanguageI } from '~/assets/Icons/Icons';

export const socialnetwork = {
    VN: {
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
                            buttonTwo: 'Tiếp tục',
                        },
                    },
                },
            },
            exchange: ' Giao Lưu',
            video: 'Gọi Video',
            search: 'Tìm kiếm',
            friends: {
                title: 'Bạn bè',
                children: {
                    option: ['Tên', 'Ngày sinh', 'Địa chỉ'],
                    menu: [
                        { name: 'Chưa kết bạn', id: 'trangers' },
                        { name: 'Đã kêt bạn', id: 'friends' },
                        { name: 'Gia đình', id: 'family' },
                        { name: 'Bạn đã gửi', id: 'yousent' },
                        { name: 'Người khác gửi', id: 'otherssent' },
                    ],
                    main: '',
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
                                { name: 'English', lg: 'EN' },
                                { name: 'VietNamese', lg: 'VN' },
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
    EN: {
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
                            buttonTwo: 'Continue',
                        },
                    },
                },
            },
            exchange: 'Exchange',
            video: 'Call Video',
            search: 'Search',
            friends: {
                title: 'Bạn bè',
                children: {
                    option: ['Name', 'BirthDay', 'Address'],
                    menu: [
                        { name: 'Not Friends', id: 'trangers' },
                        { name: 'Friends', id: 'friends' },
                        { name: 'Family', id: 'family' },
                        { name: 'You sent', id: 'yousent' },
                        { name: 'others sent', id: 'otherssent' },
                    ],
                    main: '',
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
                                { name: 'English', lg: 'EN' },
                                { name: 'VietNamese', lg: 'VN' },
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
