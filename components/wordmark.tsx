import Image from "next/image";
import Link from "next/link";
import aethelloMark from "@/app/icon.png";

export function Wordmark() {
  return (
    <Link className="wordmark focus-ring" href="/" aria-label="Aethello home">
      <Image alt="" aria-hidden="true" height={32} priority src={aethelloMark} width={32} />
      <strong>Aethello</strong>
    </Link>
  );
}
