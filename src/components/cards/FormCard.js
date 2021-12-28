import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        backgroundColor: theme.palette.type === 'light' ? '#DADADA' : '#121212',
        color: theme.palette.type === 'light' ? '#333333' : '#DADADA'
    },
    root: {
        width: '100%',
        marginBottom: '32px',
        borderRadius: '8px',
        boxShadow: theme.shadows[1]
    }
}));

const FormCard = ({
    inputFields = [],
    className,
    defaultValues = {},
    formMode = 'onChange',
    onSubmit = () => {},
    schema: defaultSchema = {},
    style,
    title
}) => {
    const classes = useStyles();
    const schema = yup.object().shape(defaultSchema);

    const { handleSubmit, control } = useForm({
        mode: formMode,
        defaultValues,
        resolver: yupResolver(schema)
    });

    return (
        <div className={className} style={style}>
            <Grid item component={Card} xs={12} className={classes.root}>
                <AppBar className={classes.cardHeader} position="static" elevation={0}>
                    <Toolbar>
                        <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <CardContent>
                    {inputFields?.map(({ Component, ...otherProps }, index) => (
                        <Component
                            control={control}
                            handleSubmit={handleSubmit}
                            key={index}
                            onSubmit={onSubmit}
                            {...otherProps}
                        />
                    ))}
                </CardContent>
            </Grid>
        </div>
    );
};

export default FormCard;
