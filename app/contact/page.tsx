export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-semibold">Contact</h1>
      <p className="text-neutral-300">
        Niente form: solo contatti diretti.
      </p>
      <div className="space-y-4 text-sm text-neutral-200">
        <div>
          <div className="font-medium">Phone / WhatsApp</div>
          <a href="tel:+393000000000" className="hover:text-amber-400">
            +39 300 000 0000
          </a>
        </div>
        <div>
          <div className="font-medium">Email</div>
          <a href="mailto:hello@giofpv.com" className="hover:text-amber-400">
            hello@giofpv.com
          </a>
        </div>
      </div>
    </main>
  );
}
