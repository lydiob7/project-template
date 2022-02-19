import React from 'react';

import { Container, Grid, IconButton, makeStyles, Modal, Paper, Typography } from '@material-ui/core';
import { CloseOutlined as CloseOutlinedIcon } from '@material-ui/icons';

import { Button, TitleDecoration } from 'custom-components';

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
    actionText = 'Delete',
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
                            <Grid item xs={false} sm={6}></Grid>
                            <Grid item xs={12} sm={3}>
                                <Button fullWidth variant="outlined" className={classes.button} onClick={onClose}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Button fullWidth color="danger" className={classes.button} onClick={handleSubmit}>
                                    {actionText}
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
