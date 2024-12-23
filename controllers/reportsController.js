const { Users, DirectEarnings, IndirectEarnings } = require('../models');

/**
 * @desc Fetch real-time earnings report for a user
 * @route GET /api/reports/earnings/:userId
 */
exports.getEarningsReport = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if the user exists
        const user = await Users.findOne({
            where: { userId },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Fetch total direct earnings
        const totalDirectEarnings = await DirectEarnings.sum('amount', { where: { parentUserId: userId } });

        // Fetch total indirect earnings
        const totalIndirectEarnings = await IndirectEarnings.sum('amount', { where: { grandParentUserId: userId } });

        // Combine the data
        const report = {
            userId,
            totalDirectEarnings: totalDirectEarnings || 0,
            totalIndirectEarnings: totalIndirectEarnings || 0,
            totalEarnings: (totalDirectEarnings || 0) + (totalIndirectEarnings || 0),
        };

        return res.status(200).json({ message: "Earnings report fetched successfully.", report });
    } catch (error) {
        console.error("Error fetching earnings report:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

/**
 * @desc Fetch breakdown of earnings across levels and referrals
 * @route GET /api/reports/earnings/breakdown/:userId
 */
exports.getEarningsBreakdown = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if the user exists
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Fetch detailed direct earnings
        const directEarnings = await DirectEarnings.findAll({
            where: { parentUserId: userId },
            include: [
                { model: Users, as: 'Referral', attributes: ['userId', 'name', 'email'] }, // Join with referred user data
            ],
        });

        // Fetch detailed indirect earnings
        const indirectEarnings = await IndirectEarnings.findAll({
            where: { grandParentUserId: userId },
            include: [
                { model: Users, as: 'LevelOneReferral', attributes: ['userId', 'name', 'email'] }, // Join with Level 1 user data
                { model: Users, as: 'LevelTwoReferral', attributes: ['userId', 'name', 'email'] }, // Join with Level 2 user data
            ],
        });

        // Combine the data
        const breakdown = {
            userId,
            directEarnings: directEarnings || [],
            indirectEarnings: indirectEarnings || [],
        };

        return res.status(200).json({ message: "Earnings breakdown fetched successfully.", breakdown });
    } catch (error) {
        console.error("Error fetching earnings breakdown:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

