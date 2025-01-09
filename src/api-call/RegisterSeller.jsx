export const RegisterSellerApi = async (token, value) => {
    try {
        const response = await fetch('https://campus-market-api.onrender.com/profile/update', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value)
        })
        const jsonResponse = await response.json()
        if (response.ok) {
            return jsonResponse
        } else {
            console.log(response)
            return false
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}