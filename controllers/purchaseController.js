const { Purchases, Users } = require('../models');
const { calculateEarnings } = require('./earningsController'); // Reuse earnings logic

/**
 * @desc Record a purchase
 * @route POST /api/purchases
 */
exports.recordPurchase = async (req, res) => {
    try {
        const { userId, purchaseAmount } = req.body;

        // Validate purchase amount
        if (!userId || !purchaseAmount || purchaseAmount <= 0) {
            return res.status(400).json({ error: "Invalid purchase data provided." });
        }

        // Fetch purchaser details
        const purchaser = await Users.findByPk(userId);
        if (!purchaser) {
            return res.status(404).json({ error: "User not found." });
        }

        // Record the purchase
        const newPurchase = await Purchases.create({
            userId: purchaser.userId,
            amount: purchaseAmount,
            status: "COMPLETED", // Default purchase status
        });

        console.log(`Purchase recorded for User ${purchaser.userId} with amount ${purchaseAmount}Rs.`);

        // Calculate earnings for eligible purchases
        if (purchaseAmount >= 1000) {
            await calculateEarnings({
                body: {
                    userId: purchaser.userId,
                    purchaseId: newPurchase.id,
                    purchaseAmount: purchaseAmount,
                },
            });
        }

        return res.status(201).json({
            message: "Purchase recorded successfully.",
            purchase: {
                id: newPurchase.id,
                userId: newPurchase.userId,
                amount: newPurchase.amount,
                status: newPurchase.status,
            },
        });
    } catch (error) {
        console.error("Error recording purchase:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

