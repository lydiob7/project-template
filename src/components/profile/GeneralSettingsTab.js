import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    AppBar,
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography
} from '@material-ui/core';
import {
    AccountCircleOutlined as AccountCircleOutlinedIcon,
    ErrorOutlineOutlined as ErrorOutlineOutlinedIcon,
    VpnKeyOutlined as VpnKeyOutlinedIcon
} from '@material-ui/icons';

import { ChangePasswordTab, DeleteAccountTab } from 'custom-components';

import { parsePath } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '60px 0 100px 0'
    },
    cardHeader: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '& .MuiToolbar-root': {
            display: 'flex',
            justifyContent: 'space-between'
        }
    }
}));

function GeneralSettingsTab() {
    const classes = useStyles();

    const [tab, setTab] = useState(1);
    const textProvider = useSelector(({ ui }) => ui.textContent.settingsPage);

    const container = {
        show: {
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div variants={container} className={classes.root} initial="hidden" animate="show">
            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <Card variants={item} className="w-full mb-32 rounded-16 shadow">
                        <AppBar className={classes.cardHeader} position="static" elevation={0}>
                            <Toolbar className="px-8">
                                <Typography variant="body1" color="inherit" className="flex-1 px-12 font-medium">
                                    {textProvider.menu.title}
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <CardContent>
                            <List component="nav">
                                <ListItem button component={Link} to={parsePath('/profile')}>
                                    <ListItemIcon>
                                        <AccountCircleOutlinedIcon style={{ fontSize: '2rem' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={textProvider.menu.profileLink} />
                                </ListItem>
                                <ListItem button onClick={() => setTab(1)}>
                                    <ListItemIcon>
                                        <VpnKeyOutlinedIcon style={{ fontSize: '2rem' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={textProvider.menu.changePwdLink} />
                                </ListItem>
                                <ListItem button onClick={() => setTab(2)}>
                                    <ListItemIcon>
                                        <ErrorOutlineOutlinedIcon style={{ fontSize: '2rem' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={textProvider.menu.deleteAccountLink} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={9}>
                    {tab === 1 && <ChangePasswordTab />}
                    {tab === 2 && <DeleteAccountTab />}
                </Grid>
            </Grid>
        </div>
    );
}

export default GeneralSettingsTab;
