import { Textarea } from "@material-tailwind/react";

import {
  Button,
  Rating,
  Typography,
  CardHeader,
  CardBody,
  Card,
  Avatar,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useReviewProductMutation } from "../features/productApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Review = ({ product }) => {
  const reviewSchema = Yup.object().shape({
    comment: Yup.string().required("Required"),
    rating: Yup.string().required("Required"),
  });
  const { user } = useSelector((store) => store.userInfo);

  const nav = useNavigate();

  const [addReview, { isLoading, isError }] = useReviewProductMutation();

  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: 0,
    },
    onSubmit: async (val) => {
      try {
        const response = await addReview({
          body: {
            comment: val.comment,
            rating: val.rating,
          },
          id: product._id,
          token: user.token,
        }).unwrap();
        console.log(response);
        if (response.status == "bad") toast.error(response.message);
        toast.success(response);
        formik.resetForm();
      } catch (err) {
        toast.error(err.data.message);
        formik.resetForm();
      }
    },
    validationSchema: reviewSchema,
  });
  return (
    <div className="p-5 ">
      {user && (
        <>
          <h1 className="text-xl font-semibold tracking-wider mb-2">
            Add Reviews
          </h1>

          <form onSubmit={formik.handleSubmit} className="space-y-4 ">
            <div className="w-96">
              <Textarea
                name="comment"
                label="Comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
              />
              {formik.errors.comment && formik.touched.comment && (
                <h1 className="text-pink-700">{formik.errors.comment}</h1>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Typography>Rate this item</Typography>
              <Rating
                name="rating"
                value={formik.values.rating}
                onChange={(v) => formik.setFieldValue("rating", v)}
              />
              {formik.errors.rating && formik.touched.rating && (
                <h1 className="text-pink-700">{formik.errors.rating}</h1>
              )}
            </div>
            {isLoading ? (
              <Button
                type="submit"
                disabled
                className="mt-6 relative py-2 flex justify-center  w-[200px] "
              >
                <div className="h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin"></div>
              </Button>
            ) : (
              <Button type="submit" className="mt-6 w-[200px]">
                Submit
              </Button>
            )}
          </form>
        </>
      )}
      <div className="my-7">
        <hr />
      </div>

      {[...product.reviews]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((review) => {
          return (
            <Card
              key={review._id}
              color="transparent"
              shadow={false}
              className="w-full max-w-sm border-[1px] border-gray-400 px-1 mb-2"
            >
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 flex items-center gap-4 pt-0 pb-2"
              >
                <Avatar
                  size="lg"
                  variant="circular"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  alt="tania andrew"
                />
                <div className="flex w-full flex-col ">
                  <div className="flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                      {review.user_info.fullname}
                    </Typography>

                    <div className="5 flex flex-col items-end gap-1">
                      <Rating value={review.rating} readonly />
                      {dayjs(review.createdAt).format("MMM D, YYYY")}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="mb-2 p-0">
                <Typography>{review.comment}</Typography>
              </CardBody>
            </Card>
          );
        })}
    </div>
  );
};
export default Review;
