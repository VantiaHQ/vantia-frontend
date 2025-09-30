
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, MessageSquare, Building, Briefcase } from "lucide-react";
import { useState, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contact_submissions") // Replace with your table name
        .insert([{ name, company, email, budget, message }]);

      if (error) {
        throw error;
      }

      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      setName("");
      setCompany("");
      setEmail("");
      setBudget("");
      setMessage("");
    } catch (error: any) {
      toast({
        title: "Error al enviar",
        description: error.message || "Algo salió mal. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="bg-[#070916] py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-left">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl max-w-full sm:max-w-xl font-extrabold tracking-tight text-white/90 mb-8 drop-shadow-[0_0_16px_rgba(80,200,255,0.3)]">
            Hablemos
          </h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-9 text-foreground/80">
            ¿Listo para potenciar tu negocio con IA? Completa el formulario y
            nos pondremos en contacto contigo para explorar cómo podemos
            ayudarte a alcanzar tus objetivos.
          </p>
          <div className="mt-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Nombre"
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
                  placeholder="Tu Empresa"
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
                  placeholder="Email"
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
                    <SelectValue placeholder="Presupuesto" />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-950/90 text-white/90 border-blue-400/30">
                    <SelectItem value="1000-3000">1000-3000 €</SelectItem>
                    <SelectItem value="3000-5000">3000-5000 €</SelectItem>
                    <SelectItem value="5000-10000">5000-10000 €</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-6 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Textarea
                  placeholder="Cuéntame más sobre tu idea"
                  className="cursor-target pl-12 pt-4 bg-blue-950/60 border-blue-400/30 focus:border-blue-400"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="cursor-target w-full bg-accent text-white/90 text-sm font-bold py-3 px-8 rounded-full shadow-lg border-2 border-transparent transition duration-300 ease-in-out hover:animate-shadow-glow hover:border-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
