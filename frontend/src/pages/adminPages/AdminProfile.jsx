import { Card, Typography } from "@material-tailwind/react";

import { useNavigate } from "react-router";
import { useGetAllOrdersQuery } from "../../features/orderApi";
import { useSelector } from "react-redux";
import UpdateAdminForm from "./UpdateAdminForm.jsx";
import dayjs from "dayjs";

const AdminProfile = () => {
  const TABLE_HEAD = ["OrderId", "Total Price", "Date", "Status", ""];

  const nav = useNavigate();

  const { user } = useSelector((store) => store.userInfo);

  const { isLoading, isError, data: orders } = useGetAllOrdersQuery(user.token);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="grid grid-cols-3 gap-9 px-4 py-4">
      <div>
        <UpdateAdminForm />
      </div>

      <div>
        <Card className="h-full w-full min-w-max table-auto   col-span-2 shadow-2xl">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
              {[...orders]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map(({ _id, totalPrice, createdAt, status }, index) => {
                  const isLast = index === orders.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b-[2px] border-blue-gray-100";
                  const classStatus =
                    status == "pending"
                      ? "bg-yellow-200"
                      : status == "proceed"
                      ? "bg-green-200"
                      : "bg-red-200";
                  return (
                    <tr key={_id} className={classStatus}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {_id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {totalPrice}
                        </Typography>
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
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {status}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <button onClick={() => nav(`/admin/adminOrder/${_id}`)}>
                          {" "}
                          <Typography
                            as="a"
                            variant="small"
                            color="blue"
                            className="font-medium"
                          >
                            Detail..
                          </Typography>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
export default AdminProfile;
