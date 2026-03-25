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
import { User, Mail, MessageSquare, Building, Sparkles } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useContactFormSubmit } from "@/hooks/useContactFormSubmit";
import { useSearchParams } from 'next/navigation';
import { MultiSelectProducts } from "@/components/ui/multi-select-products";
import {
  mainTitle,
  description,
  namePlaceholder,
  companyPlaceholder,
  emailPlaceholder,
  productPlaceholder,
  messagePlaceholder,
  productOptions,
  submittingButtonText,
  defaultButtonText,
} from "./ContactForm.content";

export default function ContactForm() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <ContactFormInner />
        </Suspense>
    );
}

function ContactFormInner() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const productParam = searchParams.get('product');
    if (productParam) {
      if (productOptions.some(o => o.value === productParam)) {
        setSelectedProducts([productParam]);
      }
    }
  }, [searchParams, productOptions]);

  const resetForm = () => {
    setName("");
    setCompany("");
    setEmail("");
    setSelectedProducts([]);
    setMessage("");
  };

  const { handleSubmit, isSubmitting } = useContactFormSubmit();

  const productLabels = productOptions
    .filter(o => selectedProducts.includes(o.value))
    .map(o => o.label)
    .join(', ');

  return (
    <div id="contact-form" className="relative">
      <div className="mx-auto max-w-3xl text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white/90 mb-4 drop-shadow-[0_0_16px_rgba(167,139,250,0.3)]">
          {mainTitle}
        </h2>
        <p className="text-lg text-foreground/70 mb-10 leading-relaxed max-w-2xl">
          {description}
        </p>
        
        <form onSubmit={(e) => handleSubmit(e, { name, company, email, product: productLabels, message }, resetForm)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-400 transition-colors" />
              <Input
                type="text"
                placeholder={namePlaceholder}
                className="cursor-target pl-12 bg-[#101025]/80 border-violet-500/10 focus:border-violet-500/30 focus:bg-[#151530]/90 transition-all rounded-xl h-12 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-400 transition-colors" />
              <Input
                type="text"
                placeholder={companyPlaceholder}
                className="cursor-target pl-12 bg-[#101025]/80 border-violet-500/10 focus:border-violet-500/30 focus:bg-[#151530]/90 transition-all rounded-xl h-12 text-white"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-400 transition-colors" />
              <Input
                type="email"
                placeholder={emailPlaceholder}
                className="cursor-target pl-12 bg-[#101025]/80 border-violet-500/10 focus:border-violet-500/30 focus:bg-[#151530]/90 transition-all rounded-xl h-12 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <MultiSelectProducts 
                options={productOptions}
                selected={selectedProducts}
                onChange={setSelectedProducts}
                placeholder={productPlaceholder}
            />
          </div>

          <div className="relative group">
            <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-violet-400 transition-colors" />
            <Textarea
              placeholder={messagePlaceholder}
              className="cursor-target pl-12 pt-3 bg-[#101025]/80 border-violet-500/10 focus:border-violet-500/30 focus:bg-[#151530]/90 transition-all rounded-xl min-h-[120px] text-white resize-none"
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

