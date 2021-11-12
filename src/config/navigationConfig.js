import { parsePath } from 'utils/helpers';

const navigationConfig = {
    headermenu: [
        {
            title: 'Home',
            dropdown: [
                {
                    title: 'Error page',
                    path: parsePath('/error')
                },
                {
                    title: 'Sub-menu Two',
                    path: parsePath('/')
                },
                {
                    title: 'Sub-menu Three',
                    path: parsePath()
                }
            ]
        },
        {
            title: 'Menu 1',
            dropdown: [
                {
                    title: 'Sub-menu Three',
                    path: parsePath()
                },
                {
                    title: 'Sub-menu Four',
                    path: parsePath()
                },
                {
                    title: 'Sub-menu Five',
                    path: parsePath()
                }
            ]
        },
        {
            title: 'Menu 2',
            path: parsePath()
        }
    ],
    footermenu: [
        {
            path: parsePath(),
            title: 'Terms & Conditions'
        },
        {
            path: parsePath(),
            title: 'Privacy Policy'
        }
    ]
};

export default navigationConfig;
