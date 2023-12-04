import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating,
} from "@material-tailwind/react";
import { baseUrl } from "../features/constant";
import { useNavigate } from "react-router";
import { Image, Shimmer } from "react-shimmer";

const CardUi = ({ product }) => {
  const nav = useNavigate();
  return (
    <Card
      className="mb-[20px] flex flex-col gap-[14px] cursor-pointer rounded-lg hover:shadow-gray-600 hover:shadow-lg bg-gray-900  text-gray-400"
      onClick={() => nav(`/productDetail/${product._id}`)}
    >
      <CardHeader color="blue-gray" className="relative h-56 ">
        {/* <Image

          src={`${product.product_image}`}
          fallback={
            <Shimmer width={800} height={600} className="w-full h-full" />
          }
        /> */}
        <img
          className="object-cover h-full w-full"
          src={`${baseUrl}${product.product_image}`}
          alt="prduct_image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" className="mb-2">
          {product.product_name}
        </Typography>
        <Typography className="h-[60px]">
          {product.product_detail.substring(0, 100) + "...."}
        </Typography>

        <div>
          <div className="flex justify-between">
            <Rating value={product.rating} readonly />
            <h1> Reviews: {product.numReviews}</h1>
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className="border border-gray-500 text-gray-400 hover:bg-gray-400 hover:text-gray-900 transition-all">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardUi;
