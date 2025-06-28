
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { productCategories } from "@/data/productCategories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, Home, Wrench, Star, Shield, Truck, HeadphonesIcon } from "lucide-react";
import ProductPricing from "@/components/product/ProductPricing";
import ProductSpecs from "@/components/product/ProductSpecs";
import { getDefaultTechnicalDetails, getDefaultSpecifications, getSizingInfo, getSizingBadgeText } from "@/components/product/helpers/productDetailHelpers";

const ProductDetail = () => {
  const { category, productId } = useParams<{ category: string; productId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  // Find the product in the category
  const categoryData = category ? productCategories[category] : null;
  const product = categoryData?.products.find(p => p.id.toString() === productId);

  if (!categoryData || !product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const technicalDetails = product.technicalDetails || getDefaultTechnicalDetails(product);
  const specifications = product.specifications || getDefaultSpecifications(product);
  const sizingInfo = getSizingInfo(product);
  const sizingBadgeText = getSizingBadgeText(product);

  const handleAddToCart = () => {
    addItem(product);
  };

  // Use the exact same image logic as ProductImage component
  const getImagePath = (imagePath: string) => {
    // If already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // For local assets that start with "public/", remove the "public/" prefix
    // as Vite will resolve correctly without it
    if (imagePath.startsWith('public/')) {
      return imagePath.substring(7);
    }
    
    return imagePath;
  };

  const getProductImage = () => {
    // Use the same logic as ProductImage component for insulation products
    if (product.category === "insulation" || product.name.includes("Insulation")) {
      return getImagePath("lovable-uploads/d2192e50-f7cc-4a5f-a701-440f5c06cb8b.png");
    }
    return getImagePath(product.image);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-voltly-green">Home</Link>
            <span>/</span>
            <Link to={`/${category}`} className="hover:text-voltly-green">{categoryData.title}</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(`/${category}`)}
            className="mb-6 flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to {categoryData.title}</span>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg bg-white border">
                <img 
                  src={getProductImage()} 
                  alt={product.name}
                  className="w-full h-96 object-contain p-4"
                  loading="lazy"
                  onError={(e) => {
                    console.error('Image failed to load:', getProductImage());
                    console.error('Original product image path:', product.image);
                    // Fallback to a placeholder or default image
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                {/* Badges - Only sizing badge now */}
                <div className="absolute top-4 right-4">
                  {sizingBadgeText && (
                    <Badge className="bg-blue-600 text-white font-medium flex items-center gap-1">
                      <Home className="h-3 w-3" />
                      {sizingBadgeText}
                    </Badge>
                  )}
                </div>
                {/* Installation Included */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-voltly-green to-green-400 text-black py-2 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <Wrench className="h-4 w-4" />
                    <span className="font-bold">Installation Included</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.category === "heat-pumps" ? 
                    `${product.brand || ''} ${product.name}`.trim() : 
                    product.name
                  }
                </h1>
                {product.model && (
                  <p className="text-lg text-gray-600">Model: {product.model}</p>
                )}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {feature}
                  </Badge>
                ))}
              </div>

              {/* Pricing */}
              <Card>
                <CardContent className="p-6">
                  <ProductPricing 
                    price={product.price} 
                    monthlyPayment={product.monthlyPayment} 
                    isPerSqft={product.isPerSqft}
                  />
                </CardContent>
              </Card>

              {/* Add to Cart */}
              <div className="space-y-4">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-voltly-green hover:bg-voltly-green/90 text-black font-semibold py-3"
                  size="lg"
                >
                  Add to Cart
                </Button>
                <div className="grid grid-cols-4 gap-4 text-center text-sm">
                  <div className="flex flex-col items-center">
                    <Shield className="h-5 w-5 text-voltly-green mb-1" />
                    <span>Warranty</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck className="h-5 w-5 text-voltly-green mb-1" />
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <HeadphonesIcon className="h-5 w-5 text-voltly-green mb-1" />
                    <span>Support</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Star className="h-5 w-5 text-voltly-green mb-1" />
                    <span>Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mt-12">
            <Card>
              <CardContent className="p-6">
                <ProductSpecs 
                  technicalDetails={technicalDetails} 
                  specifications={specifications}
                  sizingInfo={sizingInfo}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
