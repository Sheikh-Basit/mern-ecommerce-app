// src/components/Alert.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "../Redux/AlertSlice";

const Alert = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.alert);

  // Auto hide after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  // Alert Styles
  const alertStyles = {
    success: "bg-green-100 border border-green-400 text-green-700",
    error: "bg-red-100 border border-red-400 text-red-700",
    warning: "bg-yellow-100 border border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border border-blue-400 text-blue-700",
  };

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 px-4 py-3 rounded shadow-md z-50 ${alertStyles[type]}`}>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
