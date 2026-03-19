'use client';

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
    <div id="contact-form" className="relative">
      <div className="mx-auto max-w-3xl text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white/90 mb-4 drop-shadow-[0_0_16px_rgba(167,139,250,0.3)]">
          {mainTitle}
        </h2>
        <p className="text-lg text-foreground/70 mb-10 leading-relaxed max-w-2xl">
          {description}
        </p>
        
        <form onSubmit={(e) => handleSubmit(e, { name, company, email, budget, message }, resetForm)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
              <Input
                type="text"
                placeholder={namePlaceholder}
                className="cursor-target pl-12 bg-blue-950/60 border-blue-400/30 focus:border-blue-400/50 focus:bg-blue-950/80 transition-all rounded-xl h-12"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
              <Input
                type="text"
                placeholder={companyPlaceholder}
                className="cursor-target pl-12 bg-blue-950/60 border-blue-400/30 focus:border-blue-400/50 focus:bg-blue-950/80 transition-all rounded-xl h-12"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
              <Input
                type="email"
                placeholder={emailPlaceholder}
                className="cursor-target pl-12 bg-blue-950/60 border-blue-400/30 focus:border-blue-400/50 focus:bg-blue-950/80 transition-all rounded-xl h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
              <Select value={budget} onValueChange={setBudget} required>
                <SelectTrigger className="cursor-target w-full pl-12 bg-blue-950/60 border-blue-400/30 focus:border-blue-400/50 focus:bg-blue-950/80 transition-all rounded-xl h-12 text-left">
                  <SelectValue placeholder={budgetPlaceholder} />
                </SelectTrigger>
                <SelectContent className="bg-blue-950 border-blue-400/30 text-white">
                  {budgetOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="focus:bg-blue-500/20 focus:text-blue-200 cursor-pointer">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="relative group">
            <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
            <Textarea
              placeholder={messagePlaceholder}
              className="cursor-target pl-12 pt-3 bg-blue-950/60 border-blue-400/30 focus:border-blue-400/50 focus:bg-blue-950/80 transition-all rounded-xl min-h-[120px] resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="cursor-target w-full bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-full h-12 shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            disabled={isSubmitting}
          >
            {isSubmitting ? submittingButtonText : defaultButtonText}
          </Button>
        </form>
      </div>
    </div>
  );
}

