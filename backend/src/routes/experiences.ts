import express from 'express';
import supabase from '../config/db';

const router = express.Router();

// Get all experiences
router.get('/', async (req, res) => {
  try {
    const { category, location } = req.query as { category?: string; location?: string };

    let query = supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) query = query.eq('category', category);
    if (location) query = query.ilike('location', `%${location}%`);

    const { data, error } = await query;
    if (error) throw error;

    res.json({ status: 'success', data });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Error fetching experiences', error: error.message });
  }
});

// Get a specific experience by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Experience not found'
      });
    }

    // Mock available slots for now - you can create a separate model for this later
    const mockDates = ["2025-10-22", "2025-10-23", "2025-10-24", "2025-10-25", "2025-10-26"];
    const mockTimes = ["09:00 am", "11:00 am", "02:00 pm", "04:00 pm"];
    const mockAvailability = {
      "09:00 am": 4,
      "11:00 am": 2,
      "02:00 pm": 5,
      "04:00 pm": 0
    } as const;

    // Return one entry per date so the frontend receives a string at data.availableSlots[i].date
    const availableSlots = mockDates.map((date) => ({
      date,
      times: mockTimes,
      availability: mockAvailability
    }));

    res.json({ status: 'success', data: { experience: data, availableSlots } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Error fetching experience', error: error.message });
  }
});

// Create a new experience (Admin only - you can add auth later)
router.post('/', async (req, res) => {
  try {
    const { title, location, price, image, description, category } = req.body;

    if (!title || !location || price === undefined || !image || !description || !category) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('experiences')
      .insert([{ title, location, price, image, description, category }])
      .select('*')
      .single();

    if (error) throw error;

    res.status(201).json({ status: 'success', data });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Error creating experience', error: error.message });
  }
});

// Update an experience
router.put('/:id', async (req, res) => {
  try {
    const { title, location, price, image, description, category } = req.body;

    const { data, error } = await supabase
      .from('experiences')
      .update({ title, location, price, image, description, category })
      .eq('id', req.params.id)
      .select('*')
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ status: 'error', message: 'Experience not found' });

    res.json({ status: 'success', data });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Error updating experience', error: error.message });
  }
});

// Delete an experience
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ status: 'success', message: 'Experience deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Error deleting experience', error: error.message });
  }
});

export default router;

