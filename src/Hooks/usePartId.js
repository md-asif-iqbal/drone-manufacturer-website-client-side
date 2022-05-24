

import { useEffect, useState } from "react";
const usePartId = id =>{
    const [products, setProducts] = useState({});

    useEffect( () =>{
        const url = `http://localhost:8000/parts/${id}`;
        // console.log(url);
        fetch(url)
        .then(res=> res.json())
        .then(data => setProducts(data));

    }, [id]);
return [products , setProducts]
}

export default usePartId ;