import { Link } from "react-router-dom";
import { Experience } from "@/types/experience";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg">{experience.title}</h3>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {experience.location}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {experience.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">From</span>
          <span className="text-xl font-bold">₹{experience.price}</span>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
          <Link to={`/experience/${experience.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
