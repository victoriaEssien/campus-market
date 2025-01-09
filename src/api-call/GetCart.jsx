export const getCart = async (token) => {
    try {
        const response = await fetch('https://campus-market-api.onrender.com/cart/items', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        const jsonResponse = await response.json();
        // console.log(response)
        if (response.ok) {
            return jsonResponse.data
        }
        return false
    } catch (error) {
        console.log(error);
        return false
    }
}