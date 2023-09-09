import Layout from "@/components/Layout";
import axios from "axios";
import { useState} from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get('/api/products?id='+id).then(response => {
        setProductInfo(response.data);
      });
    }, [id]);
    return (
      <Layout>
        <h1>Edit product</h1>
        {productInfo && (
          <ProductForm {...productInfo} />
        )}
      </Layout>
    );
  }