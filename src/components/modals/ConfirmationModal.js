import React from 'react';
import { makeStyles } from '@material-ui/core';
import TitleDecoration from 'components/headings/TitleDecoration';
import Button from 'components/common/Button';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiPaper-root': {
            maxWidth: '80vw',
            padding: '8% 5%',
            boxSizing: 'content-box',
            margin: '0 auto',
            transform: 'translateX(-3%)'
        }
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            marginRight: '16px'
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    textArea: {
        width: '100%',
        margin: '0 0 16px 0'
    },
    closeBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        '&:focus': {
            outline: 'none'
        }
    },
    button: {
        display: 'flex',
        alignItems: 'center'
    }
}));

const ConfirmationModal = ({
    confirmationType = 'deletion',
    message = 'Are you sure you want to delete permanently this item?',
    open,
    onClose,
    onSubmit = () => {},
    ...rest
}) => {
    const classes = useStyles();

    const handleSubmit = (ev) => {
        ev?.preventDefault();
        onSubmit(ev);
        onClose();
    };

    return (
        <>
            <Modal className={classes.root} open={open} onClose={onClose}>
                <Container maxWidth="xs">
                    <Paper {...rest} component={Grid} container spacing={4}>
                        <Grid style={{ position: 'relative' }} item xs={12}>
                            <IconButton className={classes.closeBtn} onClick={onClose}>
                                <CloseOutlinedIcon />
                            </IconButton>
                            <Typography className={classes.title} variant="h5">
                                Confirm {confirmationType}
                            </Typography>
                            <TitleDecoration />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">{message}</Typography>
                        </Grid>
                        <Grid container item xs={12} spacing={1}>
                            <Grid item xs={0} sm={6}></Grid>
                            <Grid item xs={12} sm={3}>
                                <Button fullWidth variant="outlined" className={classes.button} onClick={onClose}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Button fullWidth color="danger" className={classes.button} onClick={handleSubmit}>
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Modal>
        </>
    );
};

export default ConfirmationModal;
