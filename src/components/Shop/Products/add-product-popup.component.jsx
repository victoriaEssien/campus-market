
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
                    className="px-3 py-2 md:py-4 text-base outline-none border my-3.5 rounded-lg w-full"
                    placeholder={ item.placeholder }
                />
                break;
            
                case "file":
                    template = <div className="flex items-center space-x-2 border border-dashed py-5 px-7 md:px-12 my-3.5 cursor-pointer rounded-lg">
                                    <input id="file-upload" type="file" className="hidden" />
                                    <label for="file-upload" class="items-center cursor-pointer px-4 py-2 rounded-md">
                                        <FiUploadCloud className="text-3xl cursor-pointer text-gray-400 text-center mx-auto" />
                                        <span className="cursor-pointer text-center md:px-16 text-sm md:text-lg font-semibold py-5">
                                            Click to upload
                                        </span><br />
                                        <span className="cursor-pointer text-center md:mx-14 font-thin md:font-extralight text-xs md:text-sm">
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

            <p>Hello world</p>

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

            <div className="text-center mt-6 w-9/12 mx-auto bg-secondary-900 rounded-lg cursor-pointer hover:opacity-85">
                <p className="text-white py-3.5 text-base font-semibold">Next</p>
            </div>

        </div>
    )
}
