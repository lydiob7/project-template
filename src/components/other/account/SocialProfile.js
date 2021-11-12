import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

const icons = {
    facebook: <FacebookIcon />,
    twitter: <TwitterIcon />,
    linkedin: <LinkedInIcon />,
    instagram: <InstagramIcon />
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 0',
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'flex-end'
        },
        '& li': {
            marginRight: '3px',
            display: 'inline-block',
            '&:last-child': {
                marginRight: 0
            },
            '& a': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: theme.palette.text.secondary,
                width: '38px',
                height: '38px',
                textAlign: 'center',
                backgroundColor: 'rgba(128, 137, 150, 0.1)',
                transition: 'all 0.3s',
                borderRadius: '50%',
                '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: '#fff'
                }
            }
        }
    }
}));

function SocialProfile({ socials }) {
    const classes = useStyles();
    return (
        <ul className={classes.root}>
            {socials?.map((item, i) => {
                return (
                    <li key={i}>
                        <a target="_blank" rel="noreferrer" href={item.url}>
                            <i className="fa">{icons[item.icon]}</i>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}

export default SocialProfile;
