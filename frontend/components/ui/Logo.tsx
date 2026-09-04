import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  subtitle?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({
  subtitle,
  href = "/",
  size = "md",
  className = "",
}: LogoProps) {
  const imageSizes = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const containerSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`flex ${containerSizes[size]} items-center justify-center overflow-hidden rounded-xl shrink-0`}
      >
        <Image
          src="/logo.png"
          alt="Samadhan Logo"
          width={imageSizes[size] * 1.5}
          height={imageSizes[size] * 1.5}
          className="h-full w-full object-cover"
        />
      </div>

      <div>
        <p className={`font-bold tracking-tight text-[#0c2340] ${textSizes[size]}`}>
          Samadhan
        </p>

        {subtitle && (
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
