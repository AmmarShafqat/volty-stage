
import React from "react";

const CategoryNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="text-gray-400">The requested product category does not exist.</p>
      </div>
    </div>
  );
};

export default CategoryNotFound;
