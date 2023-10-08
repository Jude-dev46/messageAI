import { AiOutlineLoading } from "react-icons/ai";

import { authActions } from "../store/auth";
import { uiActions } from "../store/uislice";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({ closeModal }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ui.isLoading);

  function goToLoginScreen() {
    dispatch(authActions.logOut());
    dispatch(uiActions.setIsModalOpen(false));
  }

  return (
    <div className="bg-[rgb(0,0,0,0.7)] fixed w-full h-screen top-0 left-0 flex flex-col justify-center items-center z-20 overflow-hidden">
      <div className="bg-white relative flex flex-col border rounded-lg p-3 z-10">
        {!isLoading && (
          <div
            onClick={closeModal}
            className="w-12 mb-2 text-center text-blue-900 cursor-pointer hover:text-blue-950 hover:font-bold"
          >
            close
          </div>
        )}
        {!isLoading && (
          <div>
            <p>Your session has expired. You need to login again</p>
          </div>
        )}
        {isLoading && (
          <AiOutlineLoading size={32} color="#000" className="animate-spin" />
        )}
        {!isLoading && (
          <button
            className="bg-slate-950 p-4 mt-2 text-white rounded-md hover:bg-blue-950"
            onClick={goToLoginScreen}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
