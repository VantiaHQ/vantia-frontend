import Image from 'next/image';

export default function VantiaLogo() {
  return (
    <Image
      src="/images/logo-negativo.png"
      alt="Vantia Logo"
      width={130}
      height={32}
      className="h-8 w-auto"
      priority
    />
  );
}
