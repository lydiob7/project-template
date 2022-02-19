import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

import { ItemCard, ItemHorizontal } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    horizontalItems: {},
    verticalItems: {}
}));

const ItemsList = ({ items, viewMode = 'list' }) => {
    const classes = useStyles();

    if (!items || !Array.isArray(items)) return null;

    if (viewMode === 'list')
        return items.map((item, index) => (
            <Grid className={classes.horizontalItems} item xs={11}>
                <ItemHorizontal key={item.id + index} item={item} />
            </Grid>
        ));
    if (viewMode === 'grid')
        return (
            <Grid className={classes.verticalItems} item xs={11} container spacing={2}>
                {items.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <ItemCard key={item.id + index} item={item} />
                    </Grid>
                ))}
            </Grid>
        );
};

export default ItemsList;
