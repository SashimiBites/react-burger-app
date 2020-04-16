import React, {Component} from "react";
import axios from "../../../axios-orders";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {   
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading : true});
        const order = {
            ingredients : this.props.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Kenji Miyashiro",
                address: {
                    street: "Av Juan Pablo Fernandini 907",
                    zipCode: "Lima 05",
                    country: "Perú"
                },
                email: "funtret12@gmail.com"
            },
            deliveryMethod: "fastest"
        }
        axios.post("/orders.json", order)
        .then(response => {
            this.setState({loading : false});
            this.props.history.push("/");
        })
        .catch(error => {
            this.setState({loading : false});
        });
    }

    render() {
        let form = this.state.loading ? <Spinner /> : (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal code"/>
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact data</h4>
                {form}
            </div>
        );
    }
};

export default ContactData;