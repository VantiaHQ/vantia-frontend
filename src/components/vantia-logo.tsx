import Image from 'next/image';

export default function VantiaLogo() {
  return (
    <Image
      src="/images/vantia-logo.png"
      alt="Vantia Logo"
      width={130}
      height={32}
      className="h-8 w-auto"
    />
  );
}
