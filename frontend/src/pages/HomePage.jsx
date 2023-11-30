import React, { useEffect } from "react";
import CardUi from "../components/CardUi";
import { products } from "../dummy/products";
import { useGetProductsQuery } from "../features/productApi";

const HomePage = () => {
  const { isLoading, isError, data, error } = useGetProductsQuery();
  // if (isLoading) {
  // }
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <div className="p-5 flex gap-3 items-start flex-wrap">
      {data &&
        data.map((product) => {
          return <CardUi key={product._id} product={product} />;
        })}
    </div>
  );
};

export default HomePage;
