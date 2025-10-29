import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getExperienceById, handleApiError } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { BookingDetails } from "@/types/experience";

const ExperienceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<any | null>(null);
  const [availableDates, setAvailableDates] = useState<{ date: string; times: string[] }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;
      try {
        const data = await getExperienceById(id);
        if (!mounted) return;
        setExperience(data.experience);
        setAvailableDates(data.availableSlots?.map((s: any) => ({ date: s.date, times: s.times })) || []);
        setSelectedDate(data.availableSlots?.[0]?.date || "2025-10-22");
        setSelectedTime(data.availableSlots?.[0]?.times?.[0] || "09:00 am");
        setIsLoading(false);
      } catch (e) {
        const message = handleApiError(e);
        toast({ title: "Failed to load experience", description: message, variant: "destructive" });
        setExperience(null);
        setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 md:px-8 py-8">
          <div className="grid lg:grid-cols-[1fr,400px] gap-8">
            <div className="space-y-6">
              <Skeleton className="w-full h-64 rounded-xl" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!experience) {
    return <div>Experience not found</div>;
  }

  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const handleConfirm = () => {
    const bookingDetails: BookingDetails = {
      experience,
      date: selectedDate,
      time: selectedTime,
      quantity,
    };
    navigate("/checkout", { state: { bookingDetails, subtotal, taxes, total } });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 md:px-8 py-6 md:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4 md:mb-6 -ml-2 md:-ml-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Details
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6 md:gap-8">
          <div className="flex flex-col items-start gap-6 md:gap-8 w-full">
            <div className="relative aspect-[16/9] md:aspect-[16/9] rounded-xl overflow-hidden w-full">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col items-start gap-3 md:gap-4 w-full">
              <h1 className="text-2xl font-medium text-[#161616] font-inter leading-8 w-full">
                {experience.title}
              </h1>
              <p className="text-base text-[#6C6C6C] font-inter leading-6 w-full">
                {experience.description}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
              <h2 className="text-lg font-medium text-[#161616] font-inter leading-[22px] w-full">
                Choose date
              </h2>
              <div className="flex gap-2 md:gap-4 overflow-x-auto no-scrollbar w-full pb-1">
                {availableDates.length === 0 ? (
                  <span className="text-sm text-muted-foreground">No dates available</span>
                ) : availableDates.map((dateOption) => (
                  <Button
                    key={dateOption.date}
                    onClick={() => {
                      setSelectedDate(dateOption.date);
                      setSelectedTime(dateOption.times[0]);
                    }}
                    className={`h-[34px] px-3 py-2 rounded font-inter text-sm whitespace-nowrap ${
                      selectedDate === dateOption.date
                        ? "bg-[#FFD643] text-[#161616] border-none"
                        : "border border-[#BDBDBD] text-[#838383] bg-transparent"
                    }`}
                  >
                    {formatDate(dateOption.date)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
              <h2 className="text-lg font-medium text-[#161616] font-inter leading-[22px] w-full">
                Choose time
              </h2>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {(availableDates.find((d) => d.date === selectedDate)?.times || []).map((time, index) => (
                      <Button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`h-[34px] px-3 py-2 rounded flex items-center gap-1.5 ${
                          selectedTime === time
                            ? "bg-[#FFD643] text-[#161616] border-none"
                            : index === 3
                            ? "bg-[#CCCCCC] text-[#838383]"
                            : "border border-[#BDBDBD] text-[#838383] bg-transparent"
                        }`}
                        disabled={index === 3}
                      >
                        <span className="text-sm font-inter">{time}</span>
                        {index === 3 ? (
                          <span className="text-[10px] font-medium text-[#6A6A6A]">Sold out</span>
                        ) : (
                          <span className="text-[10px] font-medium text-[#FF4C0A]">
                            {4 - index} left
                          </span>
                        )}
                      </Button>
                    ))}
                </div>
                <p className="text-xs text-[#838383] font-inter leading-4">
                  All times are in IST (GMT +5:30)
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
              <h2 className="text-lg font-medium text-[#161616] font-inter leading-[22px] w-full">
                About
              </h2>
              <div className="w-full px-3 py-2 bg-[#EEEEEE] rounded flex items-center">
                <p className="text-xs text-[#838383] font-inter leading-4">
                  {experience.description}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <Card className="lg:sticky lg:top-24">
              <CardContent className="p-4 md:p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Starts at</span>
                  <span className="text-2xl font-bold">₹{experience.price}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <div className="flex items-center gap-2 md:gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-medium">₹{taxes}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold">₹{total}</span>
                  </div>
                  <Button
                    onClick={handleConfirm}
                    className="w-full bg-muted hover:bg-primary hover:text-primary-foreground text-foreground"
                    size="lg"
                  >
                    Confirm
                  </Button>
                  
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExperienceDetails;
