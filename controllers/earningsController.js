const { Users, Purchases, DirectEarnings, IndirectEarnings } = require('../models');

/**
 * @desc Calculate earnings for a purchase
 * @route POST /api/earnings/calculate
 */
exports.calculateEarnings = async (req, res) => {
    try {
        const { userId, purchaseId, purchaseAmount } = req.body;

        // Validate purchase amount threshold
        if (purchaseAmount < 1000) {
            return res.status(400).json({
                message: "Purchase amount must be 1000Rs or more to calculate earnings.",
            });
        }

        // Fetch the user who made the purchase
        const purchaser = await Users.findByPk(userId);
        if (!purchaser) {
            return res.status(404).json({ error: "Purchaser not found." });
        }

        // Calculate Direct Earnings (Level 1)
        if (purchaser.parentId) {
            const parentUser = await Users.findByPk(purchaser.parentId);
            const directEarnings = (purchaseAmount * 5) / 100;

            // Record direct earnings
            await DirectEarnings.create({
                parentUserId: parentUser.userId,
                referralUserId: purchaser.userId,
                purchaseId,
                amount: directEarnings,
                percentage: 5,
            });

            console.log(`Direct earnings of ${directEarnings}Rs recorded for User ${parentUser.userId}.`);
        }

        // Calculate Indirect Earnings (Level 2)
        if (purchaser.parentId) {
            const parentUser = await Users.findByPk(purchaser.parentId);
            if (parentUser.parentId) {
                const grandParentUser = await Users.findByPk(parentUser.parentId);
                const indirectEarnings = (purchaseAmount * 1) / 100;

                // Record indirect earnings
                await IndirectEarnings.create({
                    grandParentUserId: grandParentUser.userId,
                    levelOneReferralId: parentUser.userId,
                    levelTwoReferralId: purchaser.userId,
                    purchaseId,
                    amount: indirectEarnings,
                    percentage: 1,
                });

                console.log(`Indirect earnings of ${indirectEarnings}Rs recorded for User ${grandParentUser.userId}.`);
            }
        }

        res.status(200).json({
            message: "Earnings calculated successfully for eligible purchase.",
        });
    } catch (error) {
        console.error("Error calculating earnings:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};
