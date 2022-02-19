import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AppBar, Card, CardContent, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';

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
    className,
    formMode = 'onChange',
    inputFields = [],
    onSubmit = () => {},
    schema: defaultSchema = {},
    style,
    title,
    values = {}
}) => {
    const classes = useStyles();
    const schema = yup.object().shape(defaultSchema);

    const { handleSubmit, reset, control } = useForm({
        mode: formMode,
        defaultValues: values,
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (values) reset({ ...values });
    }, [values, reset]);

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
                    {inputFields?.map(({ Component, name, value, ...otherProps }, index) => (
                        <Component
                            allValues={values}
                            control={control}
                            handleSubmit={handleSubmit}
                            key={index}
                            name={name}
                            onSubmit={onSubmit}
                            value={values[name] || value}
                            {...otherProps}
                        />
                    ))}
                </CardContent>
            </Grid>
        </div>
    );
};

export default FormCard;
