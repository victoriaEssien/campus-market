
export const ProductItemComponent = ({ ad }) => {

    return (
        <>
            <div className="cursor-pointer">
                <img src={ad.image} alt={ad.name} className="" />
            </div>
            <p className="mt-4 text-sm text-left font-os font-medium text-black-500">{ad.name}</p>
            <p className="mt-1 text-base text-left font-os font-bold text-black-600">{ad.price}</p>
        </>
    )
}
