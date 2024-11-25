
export const ProductDetailsComponent = ({ product }) => {

    return (
        <>
            <div className="mx-4">
                <h2 className="text-xl font-semibold mb-5">Product Description</h2>
                <p className="text-black-600 text-base font-light">
                    {product.details}
                    {/* <span className="font-semibold cursor-pointer">Read More</span> */}
                </p>
            </div>
        </>
    )
}
