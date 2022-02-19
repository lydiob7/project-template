import React from 'react';

import { Container, Grid, IconButton, makeStyles, Modal, Paper, TextField, Typography } from '@material-ui/core';
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
    submitBtn: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiSvgIcon-root': {
            marginRight: '8px'
        }
    }
}));

const ReportItemModal = ({ open, onClose, onSubmit = () => {}, ...rest }) => {
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
                                Report this Listing
                            </Typography>
                            <TitleDecoration />
                        </Grid>
                        <Grid item xs={12}>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <TextField
                                    multiline
                                    label="Write a Message"
                                    minRows="6"
                                    className={classes.textArea}
                                    variant="outlined"
                                    name="message"
                                    placeholder="What's wrong with this listing?"
                                    required
                                />

                                <Button className={classes.submitBtn} type="submit">
                                    Send message
                                </Button>
                            </form>
                        </Grid>
                    </Paper>
                </Container>
            </Modal>
        </>
    );
};

export default ReportItemModal;
