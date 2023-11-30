import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUserUpdateMutation } from "../../features/authApi";
import { toast } from "react-toastify";
import { userUpdate } from "../../features/userSlice";

const UpdateForm = () => {
  const [update, { isLoading }] = useUserUpdateMutation();

  const userSchema = Yup.object().shape({
    fullname: Yup.string().min(5).max(20).required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().min(5).max(20).required("Required"),
  });

  const { user } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullname: user?.fullname,
      address: user?.shippingAddress.address,
      city: user?.shippingAddress.city,
    },
    onSubmit: async (val) => {
      try {
        const response = await update({
          body: {
            fullname: val.fullname,
            address: val.address,
            city: val.city,
            isEmpty: false,
          },
          token: user.token,
        }).unwrap();
        dispatch(
          userUpdate({
            fullname: val.fullname,
            shippingAddress: {
              address: val.address,
              city: val.city,
              isEmpty: false,
            },
          })
        );
        toast.success(response);
      } catch (err) {
        toast.error(err.data);
      }
    },
    validationSchema: userSchema,
  });

  return (
    <>
      <Card color="transparent" shadow={false}>
        <Typography
          variant="h4"
          color="blue-gray"
          className="border-[gray] border-b-2 pb-1"
        >
          Profile
        </Typography>
        <form onSubmit={formik.handleSubmit} className="mt-4 mb-2 ">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Update Username:
          </Typography>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              name="fullname"
              onChange={formik.handleChange}
              value={formik.values.fullname}
              type="text"
              size="lg"
              label="Username"
            />
            {formik.errors.fullname && formik.touched.fullname && (
              <h1 className="text-pink-700">{formik.errors.fullname}</h1>
            )}
          </div>
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Update Shipping Address:
          </Typography>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              name="address"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address}
              size="lg"
              label="Address"
            />

            {formik.errors.address && formik.touched.address && (
              <h1 className="text-pink-700">{formik.errors.address}</h1>
            )}

            <Input
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
              type="text"
              size="lg"
              label="City"
            />
            {formik.errors.city && formik.touched.city && (
              <h1 className="text-pink-700">{formik.errors.city}</h1>
            )}
          </div>
          {isLoading ? (
            <Button type="submit" className="mt-6" fullWidth>
              <div className="h-7 w-7 border-2 border-t-blue-gray-900 rounded-full animate-spin mx-auto "></div>
            </Button>
          ) : (
            <Button type="submit" className="mt-6" fullWidth>
              Update
            </Button>
          )}
        </form>
      </Card>
    </>
  );
};
export default UpdateForm;
