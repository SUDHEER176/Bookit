import express from 'express';
import supabase from '../config/db';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const {
      experienceId,
      userId,
      date,
      time,
      quantity,
      subtotal,
      taxes,
      total,
      promoCode,
      discountAmount,
      notes,
    } = req.body;

    // Validate UUID format for experienceId to avoid DB errors
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (!experienceId || !uuidRegex.test(experienceId)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid experienceId. Expected a UUID from /api/experiences response.'
      });
    }

    if (!experienceId || !userId || !date || !time || !quantity || subtotal === undefined || taxes === undefined || total === undefined) {
      return res.status(400).json({ 
        status: 'error',
        message: 'Missing required fields' 
      });
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        { 
          experience_id: experienceId, 
          user_id: userId, 
          date, 
          time, 
          quantity, 
          subtotal, 
          taxes, 
          total, 
          promo_code: promoCode, 
          discount_amount: discountAmount, 
          notes,
          status: 'confirmed'
        }
      ])
      .select('*')
      .single();

    if (error) throw error;
    
    res.status(201).json({ 
      status: 'success', 
      data 
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error creating booking', 
      error: error.message 
    });
  }
});

// Get all bookings for a user (must come before /:id route)
router.get('/user/:userId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', req.params.userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// Get a specific booking (must come after specific routes like /user/:userId)
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Booking not found' });
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body as { status: 'pending' | 'confirmed' | 'cancelled' };
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', req.params.id)
      .select('*')
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Booking not found' });
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
});

export default router;