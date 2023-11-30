import { useNavigate } from "react-router";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useAddOrderMutation } from "../../features/orderApi";
import { clearCartItem } from "../../features/userSlice";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { carts, user } = useSelector((store) => store.userInfo);
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const total = carts.reduce((a, b) => {
    return a + b.qty * b.price;
  }, 0);

  const nav = useNavigate();

  const dispatch = useDispatch();
  const orderAdd = async (totalPrice, orderItems) => {
    try {
      const response = await addOrder({
        body: {
          totalPrice,
          orderItems,
          shippingAddress: user.shippingAddress,
        },
        token: user.token,
      }).unwrap();
      dispatch(clearCartItem());
      toast.success(response);
      nav("/", { replace: true });
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <div className="p-10 space-y-10">
      <h1>Delivery Address</h1>

      <p className="text-gray-700">
        {user.shippingAddress.address}, {user.shippingAddress.city}
      </p>

      <p>Total Amount is: Rs {total}</p>

      {isLoading ? (
        <Button type="submit" className="mt-6 max-w-lg" fullWidth>
          <div className="h-7 w-7 border-2 border-t-blue-gray-900 rounded-full animate-spin mx-auto "></div>
        </Button>
      ) : (
        <Button
          onClick={() => orderAdd(total, carts)}
          className="mt-6 max-w-lg py-[18px]"
          fullWidth
        >
          CheckOut
        </Button>
      )}
    </div>
  );
};
export default OrderPage;
