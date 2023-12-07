import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import CardUi from "../components/CardUi";
import { useGetSearchProductsQuery } from "../features/productApi";
import ContentWrapper from "../components/ContentWrapper";

const SearchProduct = () => {
  const { search } = useParams();
  const { data, isLoading, error, isError, isFetching } =
    useGetSearchProductsQuery(search);

  const skeleItem = () => (
    <Card className="mb-[20px] flex flex-col gap-[14px] cursor-pointer rounded-lg h-fit">
      <CardHeader className="relative h-56 aspect-[3/2] shrink-0">
        <div className="object-cover h-full w-full skeleton"></div>
      </CardHeader>
      <CardBody>
        <div className="mb-4 w-[75%] h-[22px] skeleton rounded-md"></div>
        <div className="mb-4 w-[100%] h-[18px] skeleton rounded-md"></div>
        <div className="mb-4 w-[100%] h-[18px] skeleton rounded-md"></div>

        <div>
          <div className="flex justify-between">
            <div className=" w-[40%] h-[18px] skeleton rounded-md"></div>
            <div className=" w-[40%] h-[18px] skeleton rounded-md"></div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="mt-[-20px]">
        <div className="w-[45%] skeleton rounded-md h-[40px]"></div>
      </CardFooter>
    </Card>
  );
  if (isError) return <Error error={error} />;

  return (
    <ContentWrapper>
      {!isFetching ? (
        <>
          {data ? (
            <div className=" grid grid-cols-1 gap-y-10 gap-x-5 justify-between res_xm:grid-cols-2 res_sm:grid-cols-3 res_md:grid-cols-4 my-[50px] mx-5 ">
              {!isFetching &&
                data.map((product) => {
                  return <CardUi key={product._id} product={product} />;
                })}
            </div>
          ) : (
            <span className="text-[24px] sm:text-[32px] md:text-[46px] font-bold p-5">
              Sorry, Results not found
            </span>
          )}
        </>
      ) : (
        <div className=" grid grid-cols-1 gap-y-8 gap-x-5 justify-between res_xm:grid-cols-2 res_sm:grid-cols-3 res_md:grid-cols-4 mt-[50px] mx-5 ">
          {skeleItem()}
          {skeleItem()}
          {skeleItem()}
          {skeleItem()}
          {skeleItem()}
          {skeleItem()}
          {skeleItem()}
          {skeleItem()}
        </div>
      )}
    </ContentWrapper>
  );
};

export default SearchProduct;
