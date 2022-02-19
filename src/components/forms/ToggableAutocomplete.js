import React, { useState } from 'react';

import { Chip, Icon, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { SaveOutlined as SaveOutlinedIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: 2
    },
    field: (props) => ({
        marginBottom: '16px',
        padding: '0 16px',
        border: props.value ? 'none' : `1px solid ${theme.palette.error.main}`
    }),
    flexBetween: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: '.92rem',
        fontWeight: 500,
        marginBottom: '4px'
    },
    listItem: {
        margin: '.5rem 0'
    },
    requiredSymbol: {
        color: theme.palette.error.main
    }
}));

const ToggableSelect = ({
    addOption = () => {},
    label,
    multiple = true,
    name,
    options = [],
    onSubmit = () => {},
    placeholder = '',
    required = false,
    requiredLength = 1,
    style,
    type,
    value = []
}) => {
    const [edit, setEdit] = useState(false);
    const [editedValues, setEditedValues] = useState(value);
    const [skillsToAdd, setSkillsToAdd] = useState([]);

    const classes = useStyles({
        value: (required && !value) || (required && value.length < requiredLength) ? false : true
    });

    const handleChange = (_, values) => {
        const parsedValues = [];
        values.forEach((val) => {
            if (typeof val === 'string') {
                setSkillsToAdd([...skillsToAdd, { title: val }]);
                return parsedValues.push({ title: val });
            }

            parsedValues.push(val);
        });
        setEditedValues(parsedValues);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        skillsToAdd.forEach((skill) => {
            if (skill) addOption(skill);
        });
        onSubmit({ [name]: editedValues });
        setEdit(false);
    };

    const contentItem = (item, index) => {
        if (item === '') return null;
        if (type === 'location')
            return (
                <div onClick={() => setEdit(true)} style={{ display: 'flex', alignItems: 'center' }} key={item + index}>
                    <Typography>{item?.title}</Typography>
                    <Icon style={{ fontSize: '1rem', margin: '0 4px' }} color="action">
                        location_on
                    </Icon>
                </div>
            );
        if (type === 'chip')
            return (
                <Chip
                    onClick={() => setEdit(true)}
                    style={{ margin: '8px' }}
                    key={item + index}
                    label={item?.title}
                    color="primary"
                    variant="outlined"
                />
            );
        return (
            <li onClick={() => setEdit(true)} className={classes.listItem} key={item + index}>
                {item?.title}
            </li>
        );
    };

    return (
        <div style={style} className={classes.field} onClick={() => setEdit(true)}>
            <form onSubmit={handleSubmit}>
                <div className={classes.flexBetween}>
                    <Typography className={classes.label}>
                        {label} {required && <span className={classes.requiredSymbol}>*</span>}
                    </Typography>

                    <div>
                        {edit && (
                            <IconButton type="submit">
                                <SaveOutlinedIcon style={{ fontSize: '1.3rem', margin: '0 4px' }} color="primary" />
                            </IconButton>
                        )}
                        <IconButton
                            onClick={(ev) => {
                                ev.stopPropagation();
                                setEdit(!edit);
                            }}
                        >
                            <Icon style={{ fontSize: '1rem', margin: '0 4px' }} color="action">
                                {edit ? 'close' : 'edit'}
                            </Icon>
                        </IconButton>
                    </div>
                </div>
                {edit ? (
                    <Autocomplete
                        autoSelect
                        limitTags={3}
                        multiple={multiple}
                        onChange={handleChange}
                        options={options}
                        freeSolo
                        getOptionLabel={(option) => option?.title}
                        getOptionSelected={(option, value) => option.title === value.title}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option?.title} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField {...params} autoFocus variant="standard" placeholder={placeholder} />
                        )}
                        style={{ margin: '8px 0 16px 0' }}
                        value={editedValues}
                    />
                ) : Array.isArray(editedValues) ? (
                    editedValues.map(contentItem)
                ) : (
                    <Typography variant="body1">{editedValues}</Typography>
                )}
            </form>
        </div>
    );
};

export default ToggableSelect;
