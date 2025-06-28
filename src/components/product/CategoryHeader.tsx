
import React from "react";

interface CategoryHeaderProps {
  title: string;
  description: string;
  category?: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, description, category }) => {
  // Categories that should not display descriptions
  const hideDescriptionCategories = ['furnaces', 'air-conditioners', 'tankless'];
  
  const shouldHideDescription = category && hideDescriptionCategories.includes(category);

  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Shop Online. Delivered & Installed.</h1>
      {!shouldHideDescription && (
        <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
};

export default CategoryHeader;
