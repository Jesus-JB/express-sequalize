import { FaBook, FaEnvelope, FaLightbulb, FaUserShield, FaTools, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

export default function Info() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const faqs = [
    {
      q: "¿Por qué no puedo editar o eliminar algunas fotos?",
      a: "Solo el dueño de la foto o un administrador puede editar o eliminar una imagen. Si no eres el dueño, solo puedes verla."
    },
    {
      q: "¿Cómo me convierto en administrador?",
      a: "Solo otro administrador puede asignarte ese rol. Contacta a soporte si lo necesitas."
    },
    {
      q: "¿Qué hago si olvidé mi contraseña?",
      a: "Contacta a un administrador para que te ayude a recuperarla."
    },
    {
      q: "¿Puedo subir cualquier tipo de imagen?",
      a: "Solo se permiten imágenes en formatos comunes (jpg, png, etc). No subas contenido inapropiado."
    },
    {
      q: "¿Cómo reporto un problema o sugiero una mejora?",
      a: "Usa el correo de soporte o la sección de sugerencias en esta página."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto pt-24 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-2 border-b pb-2"><FaBook /> Información y Ayuda</h1>
        <div className="mb-6 grid gap-4">
          <div className="flex items-center gap-2 text-blue-700 text-lg font-semibold"><FaTools /> Tecnologías:</div>
          <div className="bg-blue-50 rounded p-3 text-blue-900">React, Tailwind, Express, MongoDB Atlas, Render, Vercel.</div>
          <div className="flex items-center gap-2 text-blue-700 text-lg font-semibold"><FaUserShield /> Privacidad:</div>
          <div className="bg-blue-50 rounded p-3 text-blue-900">Tus datos están protegidos y solo se usan para el funcionamiento de la galería.</div>
          <div className="flex items-center gap-2 text-blue-700 text-lg font-semibold"><FaEnvelope /> Contacto soporte:</div>
          <div className="bg-blue-50 rounded p-3 text-blue-900">soporte@tudominio.com</div>
          <div className="flex items-center gap-2 text-blue-700 text-lg font-semibold"><FaLightbulb /> Sugerencias:</div>
          <div className="bg-blue-50 rounded p-3 text-blue-900">¿Tienes ideas o mejoras? ¡Contáctanos!</div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">Preguntas Frecuentes (FAQ)</h2>
          <div className="divide-y">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-3">
                <button
                  className="flex items-center justify-between w-full text-left text-blue-900 font-semibold focus:outline-none"
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  aria-expanded={openFAQ === idx}
                >
                  <span>{faq.q}</span>
                  {openFAQ === idx ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openFAQ === idx && (
                  <div className="mt-2 text-gray-700 bg-blue-50 rounded p-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-8 text-right">Versión actual: v0.1</div>
      </div>
      <style>{`.animate-fade-in{animation:fadeIn .3s ease;}@keyframes fadeIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}`}</style>
    </div>
  );
} 