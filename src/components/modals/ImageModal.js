import React from 'react';
import { makeStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: ' center !important',
        alignItems: ' center !important',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    closeFile: {
        color: '#FFFFFF',
        width: '50px',
        height: '50px',
        padding: '10px',
        margin: '0 auto',
        transform: 'translateX(45vw)',
        zIndex: 999998,
        cursor: 'pointer'
    },
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '780px',
        minHeight: '50vh',
        maxHeight: '80vh',
        overflow: 'hidden',
        background: '#eeeeee',
        '& img': {
            objectFit: 'scale-down',
            maxWidth: '100%'
        }
    }
}));

const ImageModal = ({ imageUrl, onClose, open }) => {
    const classes = useStyles();
    const size = { width: window.innerWidth * 0.8, height: window.innerHeight * 0.8 };

    return (
        <Modal className={classes.container} open={open} onClose={onClose}>
            <>
                <Icon onClick={onClose} className={classes.closeFile}>
                    close
                </Icon>
                {imageUrl?.includes('pdf') ? (
                    <embed src={imageUrl} width={size.width} height={size.height} type="application/pdf" />
                ) : (
                    <div className={classes.imageWrapper}>
                        <img src={imageUrl} alt="file" />
                    </div>
                )}
            </>
        </Modal>
    );
};

export default ImageModal;
