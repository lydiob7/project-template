import React from 'react';

import { Grid } from '@material-ui/core';

import { SimpleCard } from 'custom-components';

function PopularCategories({ catitems }) {
    return (
        <Grid container spacing={2}>
            {catitems.map((item, index) => (
                <SimpleCard
                    key={index}
                    title={item.title}
                    btnText={item.stitle}
                    img={item.img}
                    icon={item.icon}
                    href={item.url}
                />
            ))}
        </Grid>
    );
}

export default PopularCategories;
