const { Users } = require('../models'); // Import Users model

/**
 * @desc Create a new user with referral
 * @route POST /api/users/register
 */
exports.registerUser = async (req, res) => {
    try {
        const { name, email, referralCode } = req.body;

        // Check if email already exists
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists." });
        }

        let parentId = null;
        let level = 1;

        if (referralCode) {
            // Validate referral code
            const referrer = await Users.findOne({ where: { referralCode } });
            if (!referrer) {
                return res.status(400).json({ error: "Invalid referral code." });
            }

            // Check if referrer is active
            if (!referrer.isActive) {
                return res.status(400).json({ error: "Referrer is inactive." });
            }

            // Check referral limit
            const directReferrals = await Users.count({ where: { parentId: referrer.userId } });
            if (directReferrals >= 8) {
                return res.status(400).json({ error: "Referrer has reached the limit of 8 direct referrals." });
            }

            parentId = referrer.userId;
            level = referrer.level + 1;
        }

        // Generate unique referral code
        const newReferralCode = `ref_${Date.now()}`;

        // Create new user
        const newUser = await Users.create({
            name,
            email,
            referralCode: newReferralCode,
            parentId,
            level,
        });

        return res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser.userId,
                name: newUser.name,
                email: newUser.email,
                referralCode: newUser.referralCode,
                parentId: newUser.parentId,
                level: newUser.level,
            },
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};





