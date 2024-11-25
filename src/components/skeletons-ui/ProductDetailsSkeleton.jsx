const ProductDetailsSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side - Image section */}
                <div className="space-y-4">
                    {/* Main image skeleton */}
                    <div className="w-full aspect-square bg-gray-200 rounded-lg animate-pulse" />

                    {/* Thumbnail row */}
                    <div className="flex gap-2">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                </div>

                {/* Right side - Product details */}
                <div className="space-y-4">
                    {/* Shop name */}
                    <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse" />

                    {/* Product title */}
                    <div className="w-3/4 h-8 bg-gray-200 rounded-lg animate-pulse" />

                    {/* Stock status */}
                    <div className="w-32 h-6 bg-gray-200 rounded-lg animate-pulse" />

                    {/* Price */}
                    <div className="w-24 h-8 bg-gray-200 rounded-lg animate-pulse" />

                    {/* Variation text */}
                    <div className="w-40 h-6 bg-gray-200 rounded-lg animate-pulse" />

                    {/* Size button */}
                    <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />

                    {/* Rating section */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-6 bg-gray-200 rounded animate-pulse" />
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
                    </div>

                    {/* Add to cart button */}
                    <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse" />

                    {/* Heart icon */}
                    <div className="absolute top-4 right-4 w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                </div>
            </div>

            {/* Product Description Section */}
            <div className="mt-8 space-y-4">
                <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse" />
                <div className="w-full h-24 bg-gray-200 rounded-lg animate-pulse" />
            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;