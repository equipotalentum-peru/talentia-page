import {
  doc,
  serverTimestamp,
  setDoc
} from "firebase/firestore";

import {
  db
} from "./firebase";


function generarId(
  nombre,
  identificador
) {
  return `${nombre}-${identificador}`
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}


/* =========================================================
   REGISTRAR ALUMNO
========================================================= */

export async function registrarAlumno(
  datos
) {
  const id =
    generarId(
      datos.nombre,
      datos.dni
    );


  /*
   * Datos comunes para cualquier alumno.
   */
  const datosAlumno = {
    nombre:
      datos.nombre,

    dni:
      datos.dni,

    email:
      datos.email,

    telefono:
      datos.telefono,

    tipo_alumno:
      datos.tipo_alumno,

    interes:
      datos.interes,

    estado:
      "Pendiente",


    /*
     * SOLO si el alumno es de convenio,
     * creamos los campos relacionados
     * con la empresa.
     *
     * Si es Alumno externo,
     * estos campos ni siquiera existirán
     * en Firebase.
     */
    ...(
      datos.tipo_alumno ===
      "Alumno convenio"
        ? {
            empresa:
              "",

            datos_empresa: {
              ruc:
                "",

              nombreEmpresa:
                "",

              nombreContacto:
                "",

              correoCorporativo:
                "",

              telefono:
                "",
            },
          }
        : {}
    ),


    fecha_registro:
      serverTimestamp(),
  };


  await setDoc(
    doc(
      db,
      "FormularioAlumno",
      id
    ),
    datosAlumno
  );


  return id;
}


/* =========================================================
   REGISTRAR EMPRESA
========================================================= */

export async function registrarEmpresa(
  datos
) {
  const id =
    generarId(
      datos.empresa,
      datos.ruc
    );


  await setDoc(
    doc(
      db,
      "FormularioEmpresa",
      id
    ),
    {
      ruc:
        datos.ruc,

      empresa:
        datos.empresa,

      contacto:
        datos.contacto,

      email:
        datos.email,

      telefono:
        datos.telefono,

      interes:
        datos.interes,

      estado:
        "Pendiente",

      fecha_registro:
        serverTimestamp(),
    }
  );


  return id;
}