import React from 'react';
import SimpleCard from 'components/cards/SimpleCard';
import Grid from '@material-ui/core/Grid';

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
