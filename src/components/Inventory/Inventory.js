import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddProduct = ()=>{
        alert("You are going to add same 81 items")
        const fakedata = [...fakeData]
        console.log(fakedata)
        fetch(`https://dhrubo001.herokuapp.com/addProduct` , {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fakedata)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    }
    // const deleteAll=()=>{
    //     fetch(`https://dhrubo001.herokuapp.com/delete` , {
    //         method:'DELETE'
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data)
    //     })
    // }
    return (
        <div>
            <h1>Inventory</h1>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;