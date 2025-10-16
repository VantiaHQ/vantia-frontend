
import { Button } from "@/components/ui/button";
import {
  Input
} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, MessageSquare, Building, Briefcase } from "lucide-react";
import { useState } from "react";
import { useContactFormSubmit } from "@/hooks/useContactFormSubmit";
import {
  mainTitle,
  description,
  namePlaceholder,
  companyPlaceholder,
  emailPlaceholder,
  budgetPlaceholder,
  messagePlaceholder,
  budgetOptions,
  submittingButtonText,
  defaultButtonText,
} from "./ContactForm.content";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setName("");
    setCompany("");
    setEmail("");
    setBudget("");
    setMessage("");
  };

  const { handleSubmit, isSubmitting } = useContactFormSubmit();

  return (
    <section id="contact-form" className="bg-[#070916] py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-left">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl max-w-full sm:max-w-xl font-extrabold tracking-tight text-white/90 mb-0 md:mb-8 drop-shadow-[0_0_16px_rgba(80,200,255,0.3)]">
            {mainTitle}
          </h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-tight md:leading-9 text-foreground/80">
            {description}
          </p>
          <div className="mt-4 md:mt-12">
            <form onSubmit={(e) => handleSubmit(e, { name, company, email, budget, message }, resetForm)} className="grid grid-cols-1 gap-2">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={namePlaceholder}
                  className="cursor-target pl-12 bg-blue-950/60 border-blue-400/30 focus:border-blue-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={companyPlaceholder}
                  className="cursor-target pl-12 bg-blue-950/60 border-blue-400/30 focus:border-blue-400"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder={emailPlaceholder}
                  className="cursor-target pl-12 bg-blue-950/60 border-blue-400/30 focus:border-blue-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Select value={budget} onValueChange={setBudget} required>
                  <SelectTrigger className="cursor-target w-full pl-12 bg-blue-950/60 border-blue-400/30 focus:border-blue-400">
                    <SelectValue placeholder={budgetPlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-950/90 text-white/90 border-blue-400/30">
                    {budgetOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-6 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Textarea
                  placeholder={messagePlaceholder}
                  className="cursor-target pl-12 pt-4 bg-blue-950/60 border-blue-400/30 focus:border-blue-400"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="mt-2 cursor-target w-full bg-accent text-white/90 text-sm font-bold py-3 px-8 rounded-full shadow-lg border-2 border-transparent transition duration-300 ease-in-out hover:animate-shadow-glow hover:border-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? submittingButtonText : defaultButtonText}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
