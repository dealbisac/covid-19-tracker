import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import './InfoBox.css';

function InfoBox({ title, cases, total, active, isRed, ...props }) {
    console.log(title, active);
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red" }`}>
            <CardContent>
                {/* Title i,e, Coronavirus Cases */}
                <Typography className="infoBox__title" color="textSecondary" gutterBottom>
                    {title}
                </Typography>

                {/* +120K, Number of cases */}
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                   {cases}
                </h2>

                {/* 1.2 Million Total */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
                
            </CardContent>
        </Card>
    )
}

export default InfoBox;
