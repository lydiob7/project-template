import React, { useState } from 'react';

import { Icon, IconButton, makeStyles, Typography } from '@material-ui/core';

import { Button, ConfirmationModal, ImageModal } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    actionButtonsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteResumeButton: {
        color: theme.palette.error.main,
        marginRight: '1rem'
    },
    editButton: {
        zIndex: 10,
        '& input': {
            position: 'absolute',
            zIndex: 10,
            opacity: 0,
            cursor: 'pointer',
            display: 'block',
            width: '2rem',
            height: '2rem'
        }
    },
    field: (props) => ({
        marginBottom: '16px',
        overflow: 'hidden',
        padding: '16px',
        border: props.value ? 'none' : `1px solid ${theme.palette.error.main}`
    }),
    fieldContentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center'
        }
    },
    label: {
        display: 'flex',
        fontSize: '.96rem',
        fontWeight: 500,
        marginBottom: '4px',
        marginRight: '2rem',
        '& span': {
            marginLeft: '10px'
        }
    },
    mainWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    requiredSymbol: {
        color: theme.palette.error.main
    },
    seeResumeButton: {
        marginRight: '1rem'
    }
}));

const ToggablePicker = ({
    allValues,
    label,
    name,
    onFileChange = () => {},
    onRemoveFile,
    onSubmit = () => {},
    required = false,
    style,
    value
}) => {
    const classes = useStyles({
        // eslint-disable-next-line
        value: required && !value ? false : true
    });
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resumeOpen, setResumeOpen] = useState(false);

    async function handleFileChange(e) {
        try {
            if (e.target.files[0]) {
                setLoading(true);
                const fileToLoad = e.target.files[0];
                const uploadedFile = await onFileChange(fileToLoad);
                onSubmit({ ...allValues, [name]: uploadedFile });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={style} className={classes.field}>
            <div className={classes.mainWrapper}>
                <div className={classes.fieldContentWrapper}>
                    <Typography className={classes.label}>
                        {label} {required && <span className={classes.requiredSymbol}>*</span>}
                    </Typography>

                    <div className={classes.actionButtonsWrapper}>
                        {value && !loading && (
                            <Button
                                className={classes.seeResumeButton}
                                variant="outlined"
                                color="primary"
                                onClick={() => setResumeOpen(true)}
                            >
                                See file
                            </Button>
                        )}

                        {onRemoveFile && value && !loading && (
                            <IconButton onClick={() => setIsConfirmationModalOpen(true)}>
                                <Icon className={classes.deleteResumeButton}>delete_outline</Icon>
                            </IconButton>
                        )}
                        <label className={classes.editButton} htmlFor="file">
                            <input
                                onChange={handleFileChange}
                                className={classes.hiddenInput}
                                accept="image/*,.pdf"
                                id="file"
                                name="file"
                                type="file"
                            />
                            {value && !loading && <Icon>edit</Icon>}
                            {!value && !loading && <Icon>upload</Icon>}
                        </label>
                    </div>
                </div>
                {loading && <p>Loading...</p>}
            </div>

            <ImageModal imageUrl={value} open={resumeOpen} onClose={() => setResumeOpen(false)} />

            <ConfirmationModal
                open={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onSubmit={onRemoveFile}
            />
        </div>
    );
};

export default ToggablePicker;
