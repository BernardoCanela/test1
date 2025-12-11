"use client";

export default function StudioOnboardingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="font-montserrat text-4xl font-bold mb-4">
          Studio Onboarding
        </h1>
        <p className="font-poppins text-gray-300">
          Brevemente: formulário para reserva do estúdio. Por agora, pode
          enviar-nos um email para{" "}
          <a className="underline" href="mailto:geral@mindframe.media">
            geral@mindframe.media
          </a>
          .
        </p>
      </div>
    </div>
  );
}
