"use client";
import { useState, useEffect } from "react";
export const TimerCounter = ({ date }: { date: Date }) => {
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState({
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diferencia = now.getTime() - date.getTime();

      const hours = Math.floor(diferencia / (1000 * 60 * 60));
      const minutes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

      setTiempoTranscurrido({ hours, minutes });
    };

    // Calcular tiempo inicial al montar el componente
    calculateTime();

    // Actualizar cada minuto
    const interval = setInterval(calculateTime, 60000);

    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [date]);

  return (
    <span>
      {`${
        tiempoTranscurrido.hours > 0
          ? `${tiempoTranscurrido.hours} horas y `
          : ""
      }           ${tiempoTranscurrido.minutes} ${
        tiempoTranscurrido.minutes > 1 ? "minutos" : "minuto"
      }`}
    </span>
  );
};
