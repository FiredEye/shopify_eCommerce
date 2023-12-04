import React, { useEffect } from "react";
import CardUi from "../components/CardUi";
import { products } from "../dummy/products";
import { useGetProductsQuery } from "../features/productApi";
import ContentWrapper from "../components/ContentWrapper";

const HomePage = () => {
  const { isLoading, isError, data, error } = useGetProductsQuery();
  // if (isLoading) {
  // }
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <ContentWrapper>
      <div className=" grid grid-cols-1 gap-y-8 gap-x-5 justify-between res_xm:grid-cols-2 res_sm:grid-cols-3 res_md:grid-cols-4 mt-[50px] mx-5">
        {data &&
          data.map((product) => {
            return <CardUi key={product._id} product={product} />;
          })}
      </div>
    </ContentWrapper>
  );
};

export default HomePage;
