import React, { useState } from 'react';

import { Checkbox, makeStyles, Typography } from '@material-ui/core';

import { TitleDecoration } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .filter-content-wrapper': {
            height: '168px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            margin: '32px 0',
            '&>div': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '& .number': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(128,137,150,.1)'
                }
            },
            '&.full-height-of-cat': {
                height: 'auto'
            }
        },
        '& .showmore-btn': {
            padding: '0 10px 0 0',
            borderRadius: '999px',
            border: `1px solid ${theme.palette.text.secondary}`,
            textAlign: 'center',
            maxWidth: '120px',
            margin: '0 auto',
            cursor: 'pointer',
            transition: 'all .3s ease',
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
                borderColor: 'transparent'
            }
        }
    }
}));

function CheckboxWidget({ items, title, onChange = () => {}, style }) {
    const classes = useStyles();
    const [isOpenCat, setIsOpenCat] = useState(false);

    const handleChange = (ev) => {
        onChange(ev);
    };

    return (
        <>
            <div style={style} className={classes.root}>
                <Typography variant="h5">{title}</Typography>
                <TitleDecoration />
                <div className={`filter-content-wrapper ${isOpenCat ? 'full-height-of-cat' : ''}`}>
                    {items?.map((item) => {
                        return (
                            <div key={item.id}>
                                <div>
                                    <Checkbox
                                        onChange={handleChange}
                                        defaultChecked={item.active}
                                        id={'chb' + item.id}
                                        value={item.id}
                                        color="primary"
                                    />
                                    <label htmlFor={'chb' + item.id}>{item.text}</label>
                                </div>
                                {item.number && <span className="number">{item.number}</span>}
                            </div>
                        );
                    })}
                </div>
                <div onClick={() => setIsOpenCat(!isOpenCat)} className="showmore-btn">
                    {isOpenCat ? (
                        <span className="lessmore-txt">Show Less</span>
                    ) : (
                        <span className="showmore-txt ">Show More</span>
                    )}
                </div>
            </div>
        </>
    );
}

export default CheckboxWidget;
