import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function AccesoAlumnoModal({ open, onClose }) {
  const botonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    botonRef.current?.focus();

    const manejarTecla = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", manejarTecla);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", manejarTecla);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="acceso-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="acceso-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="acceso-modal-title"
        aria-describedby="acceso-modal-text"
      >
        <button
          type="button"
          className="acceso-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>

        <div className="acceso-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="38" height="38" fill="none">
            <path
              d="M12 3 1.5 8.5 12 14l8.5-4.45V16"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 12v4.2c0 1.5 2.7 3.3 6 3.3s6-1.8 6-3.3V12"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span className="acceso-badge">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2c3.5 2 6 5.6 6 9.4 0 1.2-.2 2.3-.6 3.3l2.1 2.1c.4.4.5 1 .2 1.5l-1.3 2.2-3.2-1.2c-.8.5-1.8.7-3.2.7s-2.4-.2-3.2-.7L5.6 20.3 4.3 18.1c-.3-.5-.2-1.1.2-1.5l2.1-2.1c-.4-1-.6-2.1-.6-3.3C6 7.6 8.5 4 12 2zm0 5.5a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          Próximamente
        </span>

        <h2 id="acceso-modal-title">
          Plataforma <span>Talentia</span>
        </h2>

        <p id="acceso-modal-text">
          Estamos preparando tu aula virtual. Muy pronto podrás ingresar y
          continuar tu aprendizaje desde aquí.
        </p>

        <div className="acceso-row">
          <span>Ir a la plataforma</span>
          <em>Próximamente</em>
        </div>

        <button
          ref={botonRef}
          type="button"
          className="acceso-confirm"
          onClick={onClose}
        >
          Entendido
        </button>
      </div>
    </div>,
    document.body
  );
}

export default AccesoAlumnoModal;