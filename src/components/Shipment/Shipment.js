import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    
    console.log(watch("example")); // watch input value by passing the name of it

    return (
        < form onSubmit={handleSubmit(onSubmit)} >
            < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} /><br /> <br />
            {errors.exampleRequired && <span>name is required</span>}

            < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} /><br /> <br />
            {errors.exampleRequired && <span>email is required</span>}

            < input name="phone" ref={register({ required: true })} /><br /> <br />
            {errors.exampleRequired && <span>phone is required</span>}

            < input name="address" ref={register({ required: true })} /><br /> <br />
            {errors.exampleRequired && <span>address is required</span>}

            < input name="country" ref={register({ required: true })} /><br /> <br />
            {errors.exampleRequired && <span>country is required</span>}

            <input type="submit" />
        </form >
    );
};

export default Shipment;