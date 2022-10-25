export const register = {
    VN: {
        title: 'Đăng Ký',
        input: [
            { id: 0, type: 'text', placeholder: 'Tên', role: 'name' },
            { id: 1, type: 'text', placeholder: 'Số Điện Thoại Hoặc Email', role: 'phoneEmail' },
            { id: 2, type: 'password', placeholder: 'Mật Khẩu', role: 'password1' },
            { id: 3, type: 'text', placeholder: 'Nhập Lại Mật khẩu', role: 'password2' },
            {
                id: 4,
                gender: [
                    { id: 0, type: 'Trai' },
                    { id: 1, type: 'Gái' },
                    { id: 2, type: 'LGBT+' },
                ],
            },
            { id: 5, type: 'text', placeholder: 'Ngày Sinh  DD/MM/YY', role: 'date' },
        ],
        submit: 'Đăng Ký',
        messagePhoneEmail: ['Email không hợp lệ.', 'số điện thoại phải từ 9 - 11 ký tự số.'],
        messagePassword: 'Mật khẩu nhập lại không đúng.',
        messageDate: 'Ngày sinh không hợp lệ.',
        messageName: 'Độ dài phải từ 1 đến 30 ký tự.',
    },
    EN: {
        title: 'Register',
        input: [
            { id: 0, type: 'text', placeholder: 'your name', role: 'name' },
            { id: 1, type: 'text', placeholder: 'email or phone number', role: 'phoneEmail' },
            { id: 2, type: 'password', placeholder: 'password', role: 'password1' },
            { id: 3, type: 'text', placeholder: 'please password repeat', role: 'password2' },
            {
                id: 4,
                gender: [
                    { id: 0, type: 'Male' },
                    { id: 1, type: 'Femail' },
                    { id: 2, type: 'LGBT+' },
                ],
            },
            { id: 5, type: 'text', placeholder: 'BirthDate  DD/MM/YY', role: 'date' },
        ],
        submit: 'Register',
        messagePhoneEmail: ['Email Invalid', 'Phone Number must 9 - 11 characters. '],
        messagePassword: 'The password is incorrect, please try again.',
        messageDate: 'BirthDate Invalid.',
        messageName: 'Length must be between 1 and 30 character.',
    },
};
