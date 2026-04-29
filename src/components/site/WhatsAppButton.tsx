type WhatsAppButtonProps = {
  inline?: boolean;
};

export default function WhatsAppButton({
  inline = false,
}: WhatsAppButtonProps) {
  const href = "https://wa.me/919837150633";

  if (inline) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
      >
        <span>💬</span>
        <span>WhatsApp us for quick help</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-xs font-semibold text-ivory card-shadow transition hover:bg-navy-800"
    >
      WhatsApp
    </a>
  );
}
