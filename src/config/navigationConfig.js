import { authRoles } from 'auth';
import { parsePath } from 'utils/helpers';

const navigationConfig = (language) => ({
    headermenu: [
        {
            title: language?.navigationMenu?.home,
            icon: 'home_outlined',
            path: parsePath()
        },
        {
            title: language?.navigationMenu?.auth,
            dropdown: [
                {
                    title: language?.navigationMenu?.login,
                    icon: 'lock_open_outlined',
                    path: parsePath('/login')
                },
                {
                    title: language?.navigationMenu?.register,
                    icon: 'person_outlined',
                    path: parsePath('/register')
                },
                {
                    title: language?.navigationMenu?.forgotPassword,
                    icon: 'vpn_key_outlined',
                    path: parsePath('/forgot-password')
                },
                {
                    title: language?.navigationMenu?.mailConfirmation,
                    icon: 'mail_outlined',
                    path: parsePath('/reset-confirmation')
                }
            ]
        },
        {
            title: language?.navigationMenu?.account,
            dropdown: [
                {
                    title: language?.navigationMenu?.profile,
                    icon: 'person_outlined',
                    path: parsePath('/profile')
                },
                {
                    title: language?.navigationMenu?.settings,
                    icon: 'settings_outlined',
                    path: parsePath('/settings')
                }
            ]
        },
        {
            title: language?.navigationMenu?.otherPages,
            dropdown: [
                {
                    title: language?.navigationMenu?.error,
                    icon: 'error_outlined',
                    path: parsePath('/error')
                },
                {
                    path: parsePath('/terms&conditions'),
                    icon: 'gavel_outlined',
                    title: language?.footer?.menuItems?.terms
                },
                {
                    path: parsePath('/privacy-policy'),
                    icon: 'gavel_outlined',
                    title: language?.footer?.menuItems?.privacyPolicy
                }
            ]
        },
        {
            title: language?.navigationMenu?.example,
            onlyLoggedIn: true,
            roles: [authRoles.admin, authRoles.user],
            dropdown: [
                {
                    title: language?.navigationMenu?.onlyForAdmin,
                    icon: 'lock_open_outlined',
                    path: parsePath('/example-path'),
                    roles: [authRoles.admin]
                },
                {
                    title: language?.navigationMenu?.onlyForUser,
                    icon: 'lock_open_outlined',
                    path: parsePath('/example-path2'),
                    roles: [authRoles.user]
                }
            ]
        }
    ],
    footermenu: [
        {
            path: parsePath('/terms&conditions'),
            title: language?.footer?.menuItems?.terms
        },
        {
            path: parsePath('/privacy-policy'),
            title: language?.footer?.menuItems?.privacyPolicy
        }
    ]
});

export default navigationConfig;
