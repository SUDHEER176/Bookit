import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { promoCodes } from "@/data/experiences";
import { createBooking } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { bookingDetails, subtotal, taxes } = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState("");

  if (!bookingDetails) {
    navigate("/");
    return null;
  }

  const total = subtotal + taxes - discount;

  const handleApplyPromo = () => {
    const promo = promoCodes[promoCode.toUpperCase() as keyof typeof promoCodes];
    if (promo) {
      const discountAmount =
        promo.type === "percentage"
          ? Math.round(subtotal * (promo.discount / 100))
          : promo.discount;
      setDiscount(discountAmount);
      setAppliedPromo(promoCode.toUpperCase());
      toast({
        title: "Promo code applied!",
        description: `You saved ₹${discountAmount}`,
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check and try again",
        variant: "destructive",
      });
    }
  };

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validateName = (name: string) => {
    return name.length >= 3 && /^[a-zA-Z\s]+$/.test(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Please accept terms",
        description: "You must agree to the terms and safety policy",
        variant: "destructive",
      });
      return;
    }

    if (!fullName || !validateName(fullName)) {
      toast({
        title: "Invalid name",
        description: "Please enter a valid name (minimum 3 characters, letters only)",
        variant: "destructive",
      });
      return;
    }

    if (!email || !validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        experienceId: bookingDetails.experience.id,
        userId: email, // using email as a lightweight user identifier
        date: bookingDetails.date,
        time: bookingDetails.time,
        quantity: bookingDetails.quantity,
        subtotal,
        taxes,
        total,
        promoCode: appliedPromo || undefined,
        discountAmount: discount || undefined,
        notes: `Name: ${fullName}`,
      };
      const saved = await createBooking(payload);
      const bookingId = saved.id || saved.data?.id || Math.random().toString(36).substring(2, 10).toUpperCase();
      navigate("/confirmation", { state: { bookingId } });
    } catch (err) {
      toast({ title: "Booking failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 md:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 -ml-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Checkout
        </Button>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr,400px] gap-8">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-muted/50 border-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-muted/50 border-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="promoCode">Promo code</Label>
                <div className="flex gap-2">
                  <Input
                    id="promoCode"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-muted/50 border-0"
                  />
                  <Button
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-foreground hover:bg-foreground/90 text-background shrink-0"
                  >
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <p className="text-sm text-success">
                    Promo code "{appliedPromo}" applied!
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-normal cursor-pointer"
                >
                  I agree to the terms and safety policy
                </Label>
              </div>
            </CardContent>
          </Card>

          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">{bookingDetails.experience.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{bookingDetails.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{bookingDetails.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Qty</span>
                    <span className="font-medium">{bookingDetails.quantity}</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-medium">₹{taxes}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span className="font-medium">-₹{discount}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold">₹{total}</span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing…' : 'Pay and Confirm'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;
