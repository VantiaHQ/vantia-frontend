export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-6 py-4">
        <div className="text-center text-sm text-secondary-foreground">
          <p>&copy; {currentYear} Vantia AI Solutions. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
