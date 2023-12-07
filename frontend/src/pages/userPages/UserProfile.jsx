import { Card, Typography } from "@material-tailwind/react";

import { useNavigate } from "react-router";

import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useGetOrderByUserQuery } from "../../features/orderApi";
import UpdateForm from "./UpdateForm";
import ContentWrapper from "../../components/ContentWrapper";

const UserProfile = () => {
  const TABLE_HEAD = ["OrderId", "Total Price", "Date", "Status", ""];

  const nav = useNavigate();

  const { user } = useSelector((store) => store.userInfo);

  const {
    isLoading,
    error,
    isError,
    isFetching,
    data: orders,
  } = useGetOrderByUserQuery(user.token);

  const orderListSkeleton = () => (
    <>
      <tr className="">
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
      </tr>
      <tr className="">
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
      </tr>
      <tr className="">
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
      </tr>
      <tr className="">
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
        <td className="p-4">
          <div className="w-full h-[16px] skeleton rounded-md"></div>
        </td>
      </tr>
    </>
  );

  if (isError) return <Error error={error} />;

  return (
    <ContentWrapper>
      <div className="flex flex-col md:grid md:grid-cols-5 gap-9 px-4 py-6">
        <UpdateForm />
        <div className="w-full md:col-span-3">
          <Typography
            variant="h4"
            color="blue-gray"
            className="border-[gray] border-b-2 pb-1 mb-2"
          >
            Order List
          </Typography>
          <Card className=" w-full  overflow-auto shadow-2xl">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-3"
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
                {!isFetching ? (
                  <>
                    {orders ? (
                      [...orders]
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .map(
                          ({ _id, totalPrice, createdAt, status }, index) => {
                            const isLast = index === orders.length - 1;
                            const classes = isLast
                              ? "p-4"
                              : "p-4 border-b border-blue-gray-50";
                            const classStatus =
                              status == "pending"
                                ? "bg-yellow-200"
                                : status == "proceed"
                                ? "bg-green-200"
                                : "bg-red-200";
                            return (
                              <tr key={_id} className={classStatus}>
                                <td className={classes}>
                                  <p className="font-normal">{_id}</p>
                                </td>
                                <td className={classes}>
                                  <p className="font-normal">
                                    Rs: {totalPrice}
                                  </p>
                                </td>
                                <td className={classes}>
                                  <p className="font-normal">
                                    {dayjs(createdAt).format("MMM D, YYYY")}
                                  </p>
                                </td>
                                <td className={classes}>
                                  <p className="font-normal">{status}</p>
                                </td>
                                <td className={classes}>
                                  <button
                                    onClick={() => nav(`/user/order/${_id}`)}
                                  >
                                    {" "}
                                    <p className="font-medium text-blue-400">
                                      Detail..
                                    </p>
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        )
                    ) : (
                      <span className="text-[24px] sm:text-[32px] md:text-[46px] font-bold p-5">
                        Sorry, Results not found
                      </span>
                    )}
                  </>
                ) : (
                  orderListSkeleton()
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
};
export default UserProfile;
