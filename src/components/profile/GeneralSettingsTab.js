import { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

import ChangePasswordTab from './ChangePasswordTab';
import DeleteAccountTab from './DeleteAccountTab';
import { parsePath } from 'utils/helpers';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '60px 0 100px 0'
    },
    cardHeader: {
        backgroundColor: theme.palette.type === 'light' ? '#DADADA' : '#121212',
        color: theme.palette.type === 'light' ? '#333333' : '#DADADA',
        '& .MuiToolbar-root': {
            display: 'flex',
            justifyContent: 'space-between'
        }
    }
}));

function GeneralSettingsTab() {

    const textProvider = useSelector(({ui})=>ui.textContent.settingsPage)

    const classes = useStyles();
    const [tab, setTab] = useState(1);

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
                                <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
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
