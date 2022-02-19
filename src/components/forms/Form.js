import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { makeStyles } from '@material-ui/core';

import { Button } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    root: {}
}));

const Form = ({
    buttonText = 'Submit',
    className,
    formMode = 'onChange',
    hideButton,
    inputFields = [],
    onSubmit = () => {},
    schema: defaultSchema = {},
    style,
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
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
                {Array.isArray(inputFields) &&
                    inputFields.map(({ Component, name, value, ...otherProps }, index) => (
                        <Component
                            control={control}
                            key={index}
                            name={name}
                            value={values[name] || value}
                            {...otherProps}
                        />
                    ))}
                {!hideButton && <Button type="submit">{buttonText}</Button>}
            </form>
        </div>
    );
};

export default Form;
