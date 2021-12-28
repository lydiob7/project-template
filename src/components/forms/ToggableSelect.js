import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

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
        paddingLeft: '16px',
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
    category,
    control,
    controlName,
    edit,
    handleEdit = () => {},
    handleSubmit = () => {},
    label,
    multiple,
    options = [],
    onSubmit = () => {},
    required = false,
    requiredLength = 1,
    style,
    title,
    type,
    value
}) => {
    const classes = useStyles({
        value: (required && !value) || (required && value.length < requiredLength) ? false : true
    });

    const contentItem = (item, index) => {
        if (item === '') return null;
        if (type === 'location')
            return (
                <div
                    onClick={() => handleEdit(category, title)}
                    style={{ display: 'flex', alignItems: 'center' }}
                    key={item + index}
                >
                    <Typography>{item}</Typography>
                    <Icon style={{ fontSize: '1rem', margin: '0 4px' }} color="action">
                        location_on
                    </Icon>
                </div>
            );
        if (type === 'chip')
            return (
                <Chip
                    onClick={() => handleEdit(category, title)}
                    style={{ margin: '8px' }}
                    key={item + index}
                    label={item}
                    color="primary"
                    variant="outlined"
                />
            );
        return (
            <li onClick={() => handleEdit(category, title)} className={classes.listItem} key={item + index}>
                {item}
            </li>
        );
    };

    return (
        <div style={style} className={classes.field}>
            <form onSubmit={handleSubmit((values) => onSubmit(values, category, title))}>
                <div className={classes.flexBetween}>
                    <Typography className={classes.label}>
                        {label} {required && <span className={classes.requiredSymbol}>*</span>}
                    </Typography>

                    <div>
                        {edit && (
                            <IconButton type="submit">
                                <SaveAltIcon style={{ fontSize: '1rem', margin: '0 4px' }} color="action" />
                            </IconButton>
                        )}
                        <IconButton onClick={() => handleEdit(category, title)}>
                            <Icon style={{ fontSize: '1rem', margin: '0 4px' }} color="action">
                                {edit ? 'close' : 'edit'}
                            </Icon>
                        </IconButton>
                    </div>
                </div>
                {edit ? (
                    <>
                        <FormControl style={{ margin: '8px 0 16px 0' }} required fullWidth>
                            <Controller
                                name={controlName}
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        style={{ width: '100%' }}
                                        multiple={Array.isArray(value) && multiple}
                                        renderValue={(selected) =>
                                            type === 'chip' ? (
                                                <div className={classes.chips}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} className={classes.chip} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div>
                                                    {selected.map((value) => (
                                                        <p key={value}>{value}</p>
                                                    ))}
                                                </div>
                                            )
                                        }
                                    >
                                        {options.map((option, index) => (
                                            <MenuItem key={option + index} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </>
                ) : Array.isArray(value) ? (
                    value.map(contentItem)
                ) : (
                    <Typography variant="body1">{value}</Typography>
                )}
            </form>
        </div>
    );
};

export default ToggableSelect;
