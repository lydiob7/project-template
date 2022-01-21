import { parsePath } from 'utils/helpers';

const navigationConfig = {
    headermenu: [
        {
            title: 'Home',
            icon: 'home_outlined',
            path: parsePath()
        },
        {
            title: 'Auth',
            dropdown: [
                {
                    title: 'Login',
                    icon: 'lock_open_outlined',
                    path: parsePath('/login')
                },
                {
                    title: 'Register',
                    icon: 'person_outlined',
                    path: parsePath('/register')
                },
                {
                    title: 'Forgot password',
                    icon: 'vpn_key_outlined',
                    path: parsePath('/forgot-password')
                },
                {
                    title: 'Mail confirmation',
                    icon: 'mail_outlined',
                    path: parsePath('/reset-confirmation')
                }
            ]
        },
        {
            title: 'Account',
            dropdown: [
                {
                    title: 'Profile',
                    icon: 'person_outlined',
                    path: parsePath('/profile')
                },
                {
                    title: 'Account Settings',
                    icon: 'settings_outlined',
                    path: parsePath('/settings')
                }
            ]
        },
        {
            title: 'Other pages',
            dropdown: [
                {
                    title: 'Error page',
                    icon: 'error_outlined',
                    path: parsePath('/error')
                },
                {
                    path: parsePath('/terms&conditions'),
                    icon: 'gavel_outlined',
                    title: 'Terms & Conditions'
                },
                {
                    path: parsePath('/privacy-policy'),
                    icon: 'gavel_outlined',
                    title: 'Privacy Policy'
                }
            ]
        }
    ],
    footermenu: [
        {
            path: parsePath('/terms&conditions'),
            title: 'Terms & Conditions'
        },
        {
            path: parsePath('/privacy-policy'),
            title: 'Privacy Policy'
        }
    ]
};

export default navigationConfig;
