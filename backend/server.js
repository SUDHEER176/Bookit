const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
const experiences = [
  {
    id: "1",
    title: "Kayaking",
    location: "Udupi",
    price: 999,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Water Sports"
  }
];

// GET /experiences (support both /experiences and /api/experiences)
const listExperiences = (req, res) => {
  res.json({
    status: 'success',
    data: experiences
  });
};
app.get('/experiences', listExperiences);
app.get('/api/experiences', listExperiences);

// GET /experiences/:id (support both /experiences/:id and /api/experiences/:id)
const getExperienceById = (req, res) => {
  const experience = experiences.find(exp => exp.id === req.params.id);
  
  if (!experience) {
    return res.status(404).json({
      status: 'error',
      message: 'Experience not found'
    });
  }

  res.json({
    status: 'success',
    data: {
      experience,
      availableSlots: [
        {
          date: "2025-10-22",
          times: ["09:00 am", "11:00 am", "02:00 pm", "04:00 pm"],
          availability: {
            "09:00 am": 4,
            "11:00 am": 2,
            "02:00 pm": 5,
            "04:00 pm": 0
          }
        }
      ]
    }
  });
};
app.get('/experiences/:id', getExperienceById);
app.get('/api/experiences/:id', getExperienceById);

// POST /bookings (support both /bookings and /api/bookings)
const createBooking = (req, res) => {
  const { experienceId, date, time, quantity, customerDetails, promoCode, subtotal, taxes, total } = req.body;

  // Validate required fields
  if (!experienceId || !date || !time || !quantity || !customerDetails) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields'
    });
  }

  // Generate a random booking ID
  const bookingId = 'BOK' + Math.random().toString(36).substr(2, 6).toUpperCase();

  // In a real application, you would save this to a database
  const booking = {
    bookingId,
    experienceId,
    date,
    time,
    quantity,
    customerDetails,
    promoCode,
    subtotal,
    taxes,
    total,
    status: 'confirmed',
    paymentStatus: 'completed'
  };

  res.json({
    status: 'success',
    data: {
      bookingId: booking.bookingId,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      amount: booking.total
    }
  });
};
app.post('/bookings', createBooking);
app.post('/api/bookings', createBooking);

// POST /promo/validate (support both /promo/validate and /api/promo/validate)
const validatePromo = (req, res) => {
  const { code, subtotal } = req.body;

  // Define available promo codes
  const promoCodes = {
    'SAVE10': { type: 'percentage', discount: 10 },
    'FLAT100': { type: 'fixed', discount: 100 }
  };

  const promoCode = promoCodes[code];

  if (!promoCode) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid promo code'
    });
  }

  // Calculate discount
  const discountAmount = promoCode.type === 'percentage' 
    ? (subtotal * promoCode.discount / 100)
    : promoCode.discount;

  res.json({
    status: 'success',
    data: {
      code,
      valid: true,
      type: promoCode.type,
      discount: promoCode.discount,
      discountAmount
    }
  });
};
app.post('/promo/validate', validatePromo);
app.post('/api/promo/validate', validatePromo);

// Health check endpoint (support both /health and /api/health)
const health = (req, res) => res.json({ status: 'ok' });
app.get('/health', health);
app.get('/api/health', health);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.path}`,
    availableRoutes: [
      'GET /health',
      'GET /api/health',
      'GET /experiences',
      'GET /experiences/:id',
      'GET /api/experiences',
      'GET /api/experiences/:id',
      'POST /bookings',
      'POST /api/bookings',
      'POST /promo/validate',
      'POST /api/promo/validate'
    ]
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});