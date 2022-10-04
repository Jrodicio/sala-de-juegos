export class Preguntas {
  public pregunta: string;
  public respuestas: string[];
  public idImagen: number;
  public indexRespuesta: number;

  constructor(pregunta: string, respuestas: string[], idImagen: number, indexRespuesta: number){
    this.pregunta = pregunta;
    this.respuestas = respuestas;
    this.idImagen = idImagen;
    this.indexRespuesta = indexRespuesta;
  }


  public static GenerarPreguntas() : Preguntas[]{
    return [
      new Preguntas('¿En qué ciudad argentina se encuentra este monumento?', ['Rosario','Buenos Aires','Córdoba','Luján'], 10908605, 1),
      new Preguntas('¿En dónde están ubicadas las pirámides de Chichén Itzá?', ['Perú','Colombia','Egipto','México'], 3591074, 3),
      new Preguntas('¿En qué provincia se encuentra el "Cerro de los Siete Colores"?', ['Jujuy','Salta','San Juan','La Rioja'], 4161812, 0),
      new Preguntas('El Central Park, ¿en qué ciudad está ubicado?', ['Los Angeles','Chicago','New York','Washington D.C.'], 11317199, 2),
      new Preguntas('¿Cómo se llama el edificio más alto del mundo?', ['Goldin Finance 117','Lotte World Tower','Torre de Shangái','Burj Khalifa'], 162031, 3),
      new Preguntas('¿Cuál es la selva más grande del mundo?', ['Amazonas','Selva del Congo','Reserva Natural Bosawás','Selva tropical de Daintree'], 5326231, 0),
      new Preguntas('¿Quién es la persona con más seguidores en Instagram?', ['Kylie Jenner','Lionel Messi','Cristiano Ronaldo','Selena Gómez'], 248533, 2),
      new Preguntas('¿Cómo se conoce al miedo a los ojos?', ['Oculofobia','Osmofobia','Optofobia','Omatofobia'], 1925630, 3),
      new Preguntas('¿Cómo se llama el río que separa Pest de Buda?', ['Danubio','Zagyva','Sena','Támesis'], 2600763, 0),
      new Preguntas('¿Cómo se conoce al objeto que debe ser golpeado con las raquetas en el Bádminton?', ['Pelota','Pluma','Bola','Todas las anteriores'], 4966373, 1),
      new Preguntas('¿En qué año murió Elvis Presley?', ['1974','1977','1981','1971'], 12488665, 1),
      new Preguntas('¿Cuál es la montaña más alta de América?', ['Aconcagua','Huascaran','Ojos del Salado','Llullaillaco'], 1054218, 0),
      new Preguntas('¿Cuántos metros mide el Obelisco?', ['74','101','68','78'], 4328243, 2),
      new Preguntas('¿Cómo se llama la ciencia que estudia el Universo?', ['Astrología','Astronomía','Astrofísica','Cosmología'], 1257860, 3),
      new Preguntas('¿Qué país del mundo produce más vino?', ['Argentina','Francia','Italia','Chile'], 391213, 2),
      new Preguntas('¿A qué distancia está la línea de triple en el Básquet según la NBA?', ['6.75 metros','7.5 metros','6.5 metros','8 metros'], 3001822, 0),
      new Preguntas('¿Cuántos litros de sangre debería tener una persona adulta?', ['Entre 2 y 4 litros','Entre 4 y 6 litros','Más de 7 litros','Menos de 2 litros'], 4047146, 1),
      new Preguntas('¿Cuál es el libro más vendido en el mundo después de la Biblia?', ['El Señor de los Anillos','El Principito','La Odisea','Don Quijote de la Mancha'], 2553424, 3),
      new Preguntas('La sal común está formada por dos elementos, ¿cuáles son?', ['Sodio y potasio','Sodio y cloro','Potasio y cloro','Sodio y carbono'], 3693294, 1),
      new Preguntas('¿Cuántos jugadores por equipo participan en un partido de Volley?', ['4 jugadores','5 jugadores','6 jugadores','7 jugadores'], 1320761, 2),
      new Preguntas('¿Cuánto tiempo tarda la luz del Sol en llegar a la Tierra?', ['12 minutos','8 segundos','12 segundos','8 minutos'], 301599, 3),
      new Preguntas('¿En qué periodo de la prehistoria fue descubierto el fuego?', ['Paleolítico','Neolítico','Edad de piedra','Edad media'], 2543196, 0),
      new Preguntas('¿Qué hora es en inglés "It is a quarter past six"?', ['6:15','5:45','6:45','5:15'], 10386542, 0),
      new Preguntas('¿Quién descubrió la vacuna contra la rabia?', ['Marie Curie','Louis Pasteur','Antoine Lavoisier','Edward Jenner'], 3952236, 1),
    ]
  }

}
