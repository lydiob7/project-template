const navigationConfig = {
    headermenu: [
        {
            title: 'Home',
            path: process.env.PUBLIC_URL,
            dropdown: [
                {
                    title: 'Sub-menu One',
                    path: '/'
                }
            ]
        },
        {
            title: 'Menu 1',
            path: `${process.env.PUBLIC_URL}`
        },
        {
            title: 'Menu 2',
            path: `${process.env.PUBLIC_URL}`
        }
    ],
    footermenu: [
        {
            path: '#',
            title: 'Terms & Conditions'
        },
        {
            path: '#',
            title: 'Privacy Policy'
        }
    ]
};

export default navigationConfig;
