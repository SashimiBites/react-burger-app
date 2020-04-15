import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Salad", type: "salad"},
    { label: "Bacon", type: "bacon"},
    { label: "Cheese", type: "cheese"},
    { label: "Meat", type: "meat"}
];

const buildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map((element, index) => {
                    return <BuildControl 
                        key={element.label + "_" + index} 
                        label={element.label} 
                        added={() => props.ingredientAdded(element.type)}
                        removed={() => props.ingredientReduced(element.type)}
                        disabled={props.disabled[element.type]}/>
                })
            }
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}>ORDER NOW</button>
        </div>
    );
};

export default buildControls;