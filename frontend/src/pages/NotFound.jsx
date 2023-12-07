import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();
  return (
    <div className="h-[400px]">
      <dotlottie-player
        src="https://lottie.host/8f9f8f28-1109-4205-a467-da967e632fed/6htL9zZNIj.json"
        background="transparent"
        speed="1"
        loop
        autoplay
      ></dotlottie-player>

      <div className="flex flex-col  justify-center items-center mt-10 gap-2">
        <h1 className="text-center">Page Not Found</h1>
        <button
          onClick={() => nav("/")}
          className="bg-gray-900 text-center text-gray-300 px-[20px] py-[12px] w-fit rounded"
        >
          Go To Home Page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
