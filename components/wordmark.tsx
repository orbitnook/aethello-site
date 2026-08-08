import Link from "next/link";

export function Wordmark() {
  return (
    <Link className="wordmark focus-ring" href="/" aria-label="Aethello home">
      <span aria-hidden="true">A</span>
      <strong>Aethello</strong>
    </Link>
  );
}
