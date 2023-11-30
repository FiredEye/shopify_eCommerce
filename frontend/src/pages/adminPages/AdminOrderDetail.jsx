import { useNavigate, useParams } from "react-router";
import { baseUrl } from "../../features/constant";
import {
  useGetOrderByIdForAdminQuery,
  useUpdateOrderStatusMutation,
} from "../../features/orderApi";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const { id } = useParams();

  const { user } = useSelector((store) => store.userInfo);
  const nav = useNavigate();

  const { isLoading, isError, error, data } = useGetOrderByIdForAdminQuery({
    id,
    token: user.token,
  });

  const [updateOrderStatusToProceed, { isLoading: proceedLoading }] =
    useUpdateOrderStatusMutation();
  const [updateOrderStatusToCancel, { isLoading: cancelLoading }] =
    useUpdateOrderStatusMutation();

  const handleOrderStatus = async (orderStatus) => {
    try {
      if (orderStatus == "proceed") {
        const response = await updateOrderStatusToProceed({
          body: { status: "proceed" },
          token: user.token,
          id,
        }).unwrap();

        toast.success(response);
      } else {
        const response = await updateOrderStatusToCancel({
          body: { status: "cancel" },
          token: user.token,
          id,
        }).unwrap();

        toast.success(response);
      }
      nav(-1);
    } catch (err) {
      toast.error(err.message);
    }
  };
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  return (
    <div className="p-5">
      {data && (
        <div className="grid grid-cols-2 space-y-4 mb-4">
          <div>
            {data.orderItems.map((order) => {
              return (
                <div
                  key={order._id}
                  className="grid grid-cols-2 gap-4 space-x-3 mb-4"
                >
                  <div>
                    <img src={`${baseUrl}${order.image}`} alt="" />
                  </div>

                  <div className="flex flex-col justify-between">
                    <h1>{order.name}</h1>
                    <p>Rs.{order.price}</p>
                    <p>{order.qty}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="justify-self-center flex flex-col gap-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">Customer Details:</h1>
              <p>Username: {data.user.fullname}</p>
              <p>Email: {data.user.email}</p>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Delivery Address</h1>
              <p>{data.shippingAddress.address}</p>
              <p>{data.shippingAddress.city}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-black text-white flex justify-between py-2 px-5 mt-10">
        <h1 className="text-xl">Total:-</h1>
        <h1>Rs. {data.totalPrice}</h1>
      </div>
      <div className="mt-2">
        <h1 className="text-2xl font-bold mb-2">Order Status:</h1>
        <div className="flex gap-2">
          {proceedLoading ? (
            <Button
              disabled
              className=" relative py-1 flex justify-center w-[150px]"
              color="green"
            >
              <div className="h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin"></div>
            </Button>
          ) : (
            <Button
              color="green"
              onClick={() => handleOrderStatus("proceed")}
              className="w-[150px]"
            >
              Proceed
            </Button>
          )}
          {cancelLoading ? (
            <Button
              disabled
              className=" relative py-1 flex justify-center w-[150px]"
              color="red"
            >
              <div className="h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin"></div>
            </Button>
          ) : (
            <Button
              color="red"
              onClick={() => handleOrderStatus("cancel")}
              className="w-[150px]"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
