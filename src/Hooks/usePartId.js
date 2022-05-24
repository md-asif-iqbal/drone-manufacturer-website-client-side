

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Pages/Shared/Loading/Loading";
const usePartId = id =>{
   
    const [products, setProducts] = useState({});

    useEffect( () =>{
        const url = `http://localhost:8000/parts/${id}`;
        fetch(url)
        .then(res=> res.json())
        .then(data => setProducts(data));

    }, [id]);
return [products , setProducts,]
}

export default usePartId ;