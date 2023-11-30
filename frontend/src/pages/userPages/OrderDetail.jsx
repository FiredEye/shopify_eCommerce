import { useParams } from "react-router";
import { baseUrl } from "../../features/constant";
import { useGetOrderByIdQuery } from "../../features/orderApi";
import { useSelector } from "react-redux";

const OrderDetail = () => {
  const { id } = useParams();

  const { user } = useSelector((store) => store.userInfo);

  const { isLoading, isError, error, data } = useGetOrderByIdQuery({
    id,
    token: user.token,
  });

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
          <div className="justify-self-center">
            <h1 className="text-2xl font-bold mb-2">Delivery Address</h1>
            <p>{data.shippingAddress.address}</p>
            <p>{data.shippingAddress.city}</p>
          </div>
        </div>
      )}

      <div className="bg-black text-white flex justify-between py-2 px-5 mt-10">
        <h1 className="text-xl">Total:-</h1>
        <h1>Rs. {data.totalPrice}</h1>
      </div>
    </div>
  );
};
export default OrderDetail;
