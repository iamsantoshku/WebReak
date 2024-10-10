// const backendDomain = "http://your-backend-domain.com";
 // Replace with your actual backend domain
 import SummaryApi from "../common";
import { toast } from 'react-toastify';


const removeFromWishlist = async (productId) => {
    try {
        const response = await fetch(SummaryApi.removetowishlist.url, {
            method: SummaryApi.removetowishlist.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you're storing the token in local storage
            },
            body: JSON.stringify({ productId }), // Sending the productId in the request body
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to remove product from wishlist');
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        return { success: false, message: error.message };
    }
};

export default removeFromWishlist;
