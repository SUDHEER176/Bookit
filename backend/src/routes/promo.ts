import express from 'express';

const router = express.Router();

// Define available promo codes
const promoCodes: Record<string, { type: 'percentage' | 'fixed'; discount: number }> = {
  'SAVE10': { type: 'percentage', discount: 10 },
  'FLAT100': { type: 'fixed', discount: 100 }
};

// Validate promo code
router.post('/validate', async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({
        status: 'error',
        message: 'Promo code is required'
      });
    }

    const promoCode = promoCodes[code.toUpperCase()];

    if (!promoCode) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid promo code'
      });
    }

    // Calculate discount amount if subtotal is provided
    let discountAmount: number | undefined;
    if (subtotal !== undefined && subtotal !== null && subtotal > 0) {
      if (promoCode.type === 'percentage') {
        discountAmount = Math.round((subtotal * promoCode.discount) / 100);
      } else {
        discountAmount = Math.min(promoCode.discount, subtotal); // Don't allow discount more than subtotal
      }
    }

    res.json({
      status: 'success',
      data: {
        code: code.toUpperCase(),
        valid: true,
        type: promoCode.type,
        discount: promoCode.discount,
        ...(discountAmount !== undefined && { discountAmount })
      }
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Error validating promo code',
      error: error.message
    });
  }
});

export default router;

