
// Router link
import { Link } from "react-router-dom";

// Placeholder images
import FashionCategory from "../../../assets/images/fashion-category.png";

export const CategoryItemComponent = ({ category, index }) => {

    return (
        <>
            <div className="w-fit">
                <div className="bg-accent-500 hover:bg-accent-600 cursor-pointer rounded-[10px] p-2 w-48">
                    <img src={FashionCategory} alt={category.cateName} className="" />
                </div>
                <p className="mt-4 text-center font-os font-medium text-black-500">{category.cateName}</p>
            </div>
        </>
    )
}
