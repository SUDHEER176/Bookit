import Booking, { IBooking } from '../models/Booking';

class BookingService {
  // Create a new booking
  async createBooking(bookingData: Partial<IBooking>): Promise<IBooking> {
    try {
      const booking = new Booking(bookingData);
      await booking.save();
      return booking;
    } catch (error) {
      throw new Error(`Error creating booking: ${error.message}`);
    }
  }

  // Get booking by ID
  async getBookingById(bookingId: string): Promise<IBooking | null> {
    try {
      return await Booking.findById(bookingId);
    } catch (error) {
      throw new Error(`Error fetching booking: ${error.message}`);
    }
  }

  // Get all bookings for a user
  async getUserBookings(userId: string): Promise<IBooking[]> {
    try {
      return await Booking.find({ userId }).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching user bookings: ${error.message}`);
    }
  }

  // Update booking status
  async updateBookingStatus(
    bookingId: string,
    status: IBooking['status']
  ): Promise<IBooking | null> {
    try {
      return await Booking.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error(`Error updating booking status: ${error.message}`);
    }
  }

  // Cancel booking
  async cancelBooking(bookingId: string): Promise<IBooking | null> {
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }

      if (booking.status === 'completed') {
        throw new Error('Cannot cancel a completed booking');
      }

      booking.status = 'cancelled';
      await booking.save();
      return booking;
    } catch (error) {
      throw new Error(`Error cancelling booking: ${error.message}`);
    }
  }

  // Get booking statistics
  async getBookingStats(userId: string) {
    try {
      return await Booking.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalAmount: { $sum: '$pricing.total' }
          }
        }
      ]);
    } catch (error) {
      throw new Error(`Error getting booking stats: ${error.message}`);
    }
  }
}

export default new BookingService();