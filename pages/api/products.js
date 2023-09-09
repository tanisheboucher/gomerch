
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";

export default async function handle(req, res){
    const {method} = req;
    await mongooseConnect ();

    if (method === 'GET') {
        if (req.query?.id){
            res.json(await Product.findOne({_id:req.query.id}));
        } else {
            res.json(await Product.find());
        }
        
    }

    if (method === 'POST'){
        const {title, decription,price} = req.body;
        const productDoc = await Product.create({
            title,
            decription,
            price,

        })
        res.json('productDoc');
    }
}