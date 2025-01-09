
// Icons
import { FiUploadCloud } from "react-icons/fi";

export const AddProductPopUpComponent = () => {

    const formData = [
        { title: "Product Name:", placeholder: "Shoes", type: "text" },
        { title: "Product images:", type: "file" },
        { title: "Description:", placeholder: "At affordable price", type: "textarea" },
        { title: "Price(₦):", placeholder: "₦4000", type: "text" },
        { title: "Delivery Duration:", placeholder: "30mins", type: "text" }
    ];

    const renderSwicth = (item) => {
        let template;

        switch(item.type) {
            case "text":
                template = <input 
                    className="my-3.5 px-3 py-2 md:py-4 border rounded-lg w-full text-base outline-none"
                    placeholder={ item.placeholder }
                />
                break;
            
                case "file":
                    template = <div className="flex items-center space-x-2 my-3.5 px-7 md:px-12 py-5 border border-dashed rounded-lg cursor-pointer">
                                    <input id="file-upload" type="file" className="hidden" />
                                    <label for="file-upload" class="items-center px-4 py-2 rounded-md cursor-pointer">
                                        <FiUploadCloud className="mx-auto text-3xl text-center text-gray-400 cursor-pointer" />
                                        <span className="md:px-16 py-5 font-semibold text-center text-sm md:text-lg cursor-pointer">
                                            Click to upload
                                        </span><br />
                                        <span className="md:mx-14 font-thin md:font-extralight text-center text-xs md:text-sm cursor-pointer">
                                            JPG, PNG(up to 5MB)
                                        </span>
                                    </label>
                                </div>
                    break;
                
                case "textarea":
                    template = <textarea rows="4" className="rounded-lg w-full" placeholder={ item.placeholder }></textarea>
        }
        
        return template;
    }

    return (
        <div>
            {
                formData.map( (item, i) => {

                    return (
                        <div key={ i }>
                            <label>{ item.title }</label>
                            {
                                renderSwicth( item )
                            }
                        </div>
                    )
                } )
            }

            <div className="bg-secondary-900 hover:opacity-85 mx-auto mt-6 rounded-lg w-9/12 text-center cursor-pointer">
                <p className="py-3.5 font-semibold text-base text-white">Next</p>
            </div>

        </div>
    )
}
