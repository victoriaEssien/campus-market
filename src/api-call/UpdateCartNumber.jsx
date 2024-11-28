export const UpdateCartNumber = async (token, theId, term) => {
    const requestBody = {
        id: theId,
        option: term
    }
    try {
        const response = await fetch('https://campus-market-api.onrender.com/cart/change-num', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
        const jsonResponse = await response.json()
        if(response.ok){
            return jsonResponse
        }else{
            console.log(response)
            return false
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}