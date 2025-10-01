import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-red-600">401 - Unauthorized</h1>
      <p className="text-gray-600 mt-2">You don’t have access to this page.</p>
    </div>
  );
};

export default Unauthorized;