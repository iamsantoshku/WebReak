const addToWishlistModel = require("../../models/addToWishlist");

const removeFromWishlist = async (req, res) => {
    try {
        const currentUser = req.userId; // Get the current user's ID from the request
        const { productId } = req.params; // Get the product ID from the request parameters

        // Find the wishlist entry for the user and the specific product
        const wishlistEntry = await addToWishlistModel.findOneAndDelete({
            userId: currentUser,
            productId: productId,
        });

        if (!wishlistEntry) {
            return res.status(404).json({
                message: "Product not found in wishlist.",
                error: true,
                success: false,
            });
        }

        res.json({
            message: "Product removed from wishlist successfully.",
            error: false,
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = removeFromWishlist;
