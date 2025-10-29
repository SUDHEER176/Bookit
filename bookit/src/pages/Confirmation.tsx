import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId } = location.state || {};

  if (!bookingId) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 md:px-8 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-success flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-success-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Booking Confirmed</h1>
          <p className="text-muted-foreground">
            Ref ID: <span className="font-medium text-foreground">{bookingId}</span>
          </p>
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="mt-8"
          >
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Confirmation;
