
import React from "react";


const ActivityCard = (activities) => {
  return (
    <div >
      {activities && ( // si hay una actividad seleccionada se muestra el
        // componente con los datos de la actividad seleccionada  y si no
        //se muestra un componente vacio
        <div>
          <p>
            <strong>Actividad: </strong>
            {activities.name}
          </p>
          <p>
            <strong>Dificultad: </strong>
            {activities.difficulty}
          </p>
          <p>
            <strong>Duracion: </strong>
            {activities.duration}
          </p>
          <p>
            <strong>Temporada: </strong>
            {activities.season}
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;