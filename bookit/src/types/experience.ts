export interface Experience {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface Slot {
  date: string;
  times: string[];
}

export interface BookingDetails {
  experience: Experience;
  date: string;
  time: string;
  quantity: number;
}
