import { LanguageI } from '~/assets/Icons/Icons';
import { PropsSetting } from '~/reUsingComponents/Setting/interface';

export const socialnetwork = {
    VN: {
        header: {
            logo: 'Trang Chính',
            sett: 'Cài Đặt',

            home: 'Trang Chủ',
            exchange: ' Giao Lưu',
            video: 'Gọi Video',
            search: 'Tìm kiếm',
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

            home: 'Home',
            exchange: 'Exchange',
            video: 'Call Video',
            search: 'Search',
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
