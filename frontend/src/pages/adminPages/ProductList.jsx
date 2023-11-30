import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { products } from "../../dummy/products";
import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../features/productApi";
import { baseUrl } from "../../features/constant";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Products", "Price", "Created At", "Edit", "Delete"];

const ProductList = () => {
  const { user } = useSelector((store) => store.userInfo);

  const { isLoading, isError, data, error } = useGetProductsQuery();
  if (isLoading) {
  }
  const [
    deleteProduct,
    {
      isLoading: deleteIsLoading,
      isError: deleteIsError,

      error: deleteError,
    },
  ] = useDeleteProductMutation();

  const [open, setOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState({
    id: null,
    product_image: null,
  });
  const handleDeleteBox = () => {
    setOpen(false);
    setProductIdToDelete(null);
  };
  const handleDelete = async () => {
    try {
      const response = await deleteProduct({
        body: { old_productImg: productIdToDelete.product_image },
        token: user.token,
        id: productIdToDelete.id,
      }).unwrap();
      if (response) {
        setOpen(false);
        setProductIdToDelete({ id: null, product_image: null });
        toast.success(response);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const nav = useNavigate();

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-5 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Product List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all products
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => nav("/addProduct")}
                className="flex items-center gap-3"
                color="blue"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Product
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map(
                  (
                    {
                      product_image,
                      product_name,
                      createdAt,
                      _id,
                      product_price,
                    },
                    index
                  ) => {
                    const isLast = index === products.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={_id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={`${baseUrl}${product_image}`}
                              size="sm"
                            />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {product_name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              Rs.{product_price}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {dayjs(createdAt).format("MMM D, YYYY")}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Tooltip content="Edit Product">
                            <IconButton
                              onClick={() => nav(`/editProduct/${_id}`)}
                              variant="text"
                              color="blue-gray"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>

                        <td className={classes}>
                          <Tooltip content="Remove Product">
                            <IconButton
                              onClick={() => {
                                setOpen(true);
                                setProductIdToDelete({
                                  id: _id,
                                  product_image,
                                });
                              }}
                              variant="text"
                              color="red"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Dialog open={open} handler={handleDeleteBox}>
        <DialogHeader>Delete Product.</DialogHeader>
        <DialogBody divider>Once deleted cannot be retrieved.</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={handleDeleteBox}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {deleteIsLoading ? (
            <Button
              disabled
              variant="gradient"
              color="red"
              className="relative py-[6px] flex justify-center w-[100px]"
            >
              <div className="h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin"></div>
            </Button>
          ) : (
            <Button variant="gradient" color="red" onClick={handleDelete}>
              <span>Delete</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ProductList;
