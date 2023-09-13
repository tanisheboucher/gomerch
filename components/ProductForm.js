import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm ({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:exsitingprice,
}) {
    const [title, setTitle] = useState (existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(exsitingprice || '');
    const [goToProducts,setGoToProducts] = useState(false);
    const router = useRouter();
    async function saveProduct(ev){
        ev.preventDefault();
        const data = {title,description,price};
        if(_id) {
            //update
            await axios.put('/api/products', {...data,_id});
        } else {
            //create
            await axios.post('/api/products', data);
        }   
        setGoToProducts(true); 
    }
    if(goToProducts){
        router.push("/products");
    }
    return (
            <form onSubmit={createProduct}>
                <label>Product Name</label>
                <input 
                    type="text" 
                    placeholder="productname" 
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)}
                />

                <label>Description</label>
                <textarea 
                    placeholder="description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                />

                <label>Price (in JMD)</label>
                <input 
                    type="text" 
                    placeholder="price"
                    value={price} 
                    onChange={ev => setPrice(ev.target.value)}
                />
                <button 
                type="submit"
                className="btn-primary">
                Save
                </button>
            </form>
    )
}
