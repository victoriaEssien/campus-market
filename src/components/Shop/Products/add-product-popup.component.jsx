
// Icons
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import Cookies from 'js-cookie';

export const AddProductPopUpComponent = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(false)
    //errors
    const [uploadError, setUploadError] = useState(null)
    const [imageMaxError, setImageMaxError] = useState(null);

    //handle file change
    const handleFileChange = (event) => {
        let selectedFiles = Array.from(event.target.files);

        if (selectedFiles.length > 3) {
            setImageMaxError("only the first 3 files will be uploaded.");
            setTimeout(() => {
                setImageMaxError(null)
            }, 3000);
            selectedFiles = selectedFiles.slice(0, 3); // Keep only first 3 files
        }
        setFiles(selectedFiles);
    }

    //handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !price || !description || !category || !quantity || files.length === 0) {
            setUploadError("Please fill in all fields and select files before uploading.");
            return;
        }

        // Create a FormData object to send the data to the server
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("images", file); // Adjust key based on your API
        });
        formData.append("name", name);
        formData.append("details", description);
        formData.append("category", category);
        formData.append("status", quantity);
        formData.append("price", price);

        // const theBody = {
        //     name: name,
        //     details: description,
        //     category: category,
        //     status: quantity,
        //     price: price,
        //     images: files
        // }

        const apiUrl = "https://campus-market-api.onrender.com/products/new";
        const token = Cookies.get('token');
        formData.forEach((value, key) => {
            console.log(key, value);
        });
        // Make the API call to create the product
        try {
            setLoading(true)
            console.log('start')
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // 'Content-Type': 'multipart/form-data'
                },
                body: formData
            })
            console.log('END')

            const jsonResponse = await response.json();
            console.log(jsonResponse)
            console.log(response)

        } catch (error) {
            // console.log(error.errors)  
            console.log(error.message)
            setUploadError(error.message);
            setTimeout(() => {
                setUploadError(null)
            }, 3000);
        }

    }


    return (
        <div>
            <div className="mt-7">
                <div className="text-[#333333]">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-3">
                            <label>Product Name:</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="my-3.5 px-3 py-2 md:py-4 border rounded-lg outline-none w-full text-base"
                                placeholder={'jewels jewels'}
                            />
                        </div>

                        <div className="space-y-3">
                            <label>Product Category:</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="my-3.5 px-3 py-2 md:py-4 border rounded-lg outline-none w-full text-base">
                                <option >select a category</option>
                                <option value={'Storage'}>Storage</option>
                                <option value={'Data'}>Data</option>
                                <option value={'Human'}>Human</option>
                                <option value={'Accessories 2'}>Accessories 2</option>
                                <option value={'Phones'}>Phones</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label>Product Images:</label>

                            <div className="flex items-center space-x-2 my-3.5 px-7 md:px-12 py-5 border border-dashed rounded-lg cursor-pointer">
                                <input id="file-upload" type="file" multiple onChange={handleFileChange} className="hidden" />
                                <label htmlFor="file-upload" className="items-center px-4 py-2 rounded-md cursor-pointer">
                                    <FiUploadCloud className="mx-auto text-gray-400 text-3xl text-center cursor-pointer" />
                                    <span className="md:px-16 py-5 font-semibold text-sm md:text-lg text-center cursor-pointer">
                                        Click to upload
                                    </span><br />
                                    <span className="md:mx-14 font-thin md:font-extralight text-xs md:text-sm text-center cursor-pointer">
                                        Upload maximum of 3 files <br />
                                        <div className="mt-2">JPG, PNG (up to 5MB)</div> <br />
                                        {files.length > 0 && (
                                            <ul className="mt-2">
                                                {files.map((file, index) => (
                                                    <li key={index}>{file.name}</li>
                                                ))}
                                            </ul>
                                        )}
                                        {imageMaxError && <div className="mt-2 text-red-500">{imageMaxError}</div>}

                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label>Description:</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="rounded-lg w-full" placeholder={'Provide a brief description of the product you’re selling'} />
                        </div>

                        <div className="space-y-3">
                            <label>Price(₦):</label>
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="my-3.5 px-3 py-2 md:py-4 border rounded-lg outline-none w-full text-base"
                                placeholder={'2000'}
                            />
                        </div>

                        <div className="space-y-3">
                            <label>Quantity:</label>
                            <input
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                type="number"
                                className="my-3.5 px-3 py-2 md:py-4 border rounded-lg outline-none w-full text-base"
                                placeholder={'20'}
                            />
                        </div>

                        {/* <div className="space-y-3">
                            <label>Delivery Duration:</label>
                            <input
                                className="my-3.5 px-3 py-2 md:py-4 border rounded-lg outline-none w-full text-base"
                                placeholder={'How fast can this product be delivered'}
                            />
                        </div> */}

                        <div className="">

                            <button type="submit" className="bg-secondary-900 hover:opacity-85 mx-auto mt-9 py-3.5 rounded-lg w-full font-semibold text-white text-center cursor-pointer">Next</button>
                        </div>

                        {uploadError && <div className="mt-2 text-red-500 text-sm">{uploadError}</div>}


                    </form>
                </div>
            </div>
        </div>
    )
}
