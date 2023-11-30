import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAdminUpdateMutation } from "../../features/authApi";
import { toast } from "react-toastify";
import { adminUpdate } from "../../features/userSlice";

const UpdateAdminForm = () => {
  const [update, { isLoading }] = useAdminUpdateMutation();

  const userSchema = Yup.object().shape({
    fullname: Yup.string().min(5).max(20).required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const { user } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullname: user?.fullname,
      email: user?.email,
    },
    onSubmit: async (val) => {
      try {
        const response = await update({
          body: {
            fullname: val.fullname,
            email: val.email,
          },
          token: user.token,
        }).unwrap();
        dispatch(
          adminUpdate({
            fullname: val.fullname,
            email: val.email,
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
            Update Username and Email:
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
            <Input
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              size="lg"
              label="Email"
            />
            {formik.errors.email && formik.touched.email && (
              <h1 className="text-pink-700">{formik.errors.email}</h1>
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
export default UpdateAdminForm;
