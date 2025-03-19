import { BellRing, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/PayementCard";
import { useNavigate } from "react-router-dom";


const plans = [
  {
    title: "Free",
    price: "$0",
    period: "month",
    description: "Get started with basic features",
    features: [
      "Basic player statistics",
      "Limited access to historical data",
      "Basic comparison tool",
    ],
    popular: false,
  },
  {
    title: "Essential",
    price: "$50",
    period: "month",
    description: "Perfect for fantasy sports enthusiasts",
    features: [
      "Access the statistical view of players",
      "Full-season player statistics",
      "Advanced comparison tool",
      "Player performance predictions",
    ],
    popular: true,
  },
  {
    title: "Professional",
    price: "$99",
    period: "month",
    description: "Complete toolkit for serious managers",
    features: [
      "Real-time injury updates",
      "Full-season player statistics",
      "Advanced comparison tool",
      "Personalized team recommendations",
      "Priority customer support",
    ],
    popular: false,
  },
];

export default function PaidPlans() {

const navigate=useNavigate();

  return (
    <div className="py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Select the perfect plan to enhance your fantasy sports experience and build your winning team
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.title} className={cn(
            "flex flex-col h-full",
            plan.popular ? "border-primary shadow-lg" : ""
          )}>
            <CardHeader className="pb-4">
              {plan.popular && (
                <div className="flex items-center text-primary font-medium text-sm mb-2">
                  <Star className="h-4 w-4 mr-1" /> Most Popular
                </div>
              )}
              <CardTitle className="text-2xl">{plan.title}</CardTitle>
              <div className="flex items-baseline mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">/{plan.period}</span>
              </div>
              <CardDescription className="mt-2">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={cn(
                  "w-full",
                  plan.popular ? "bg-primary hover:bg-primary/90" : ""
                )}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => navigate('/coming-soon')}
              >
                {plan.title === "Free" ? "Get Started" : "Subscribe Now"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}