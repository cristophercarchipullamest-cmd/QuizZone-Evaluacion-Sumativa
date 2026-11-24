
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// PASO 2. BANCO DE PREGUNTAS


const videojuegos = [
  {
    pregunta: '¿Cómo se llama el protagonista de God of War?',
    opciones: ['Kratos', 'Arthur', 'Joel', 'Leon'],
    correcta: 0
  },
  {
    pregunta: '¿Qué personaje es el protagonista de Minecraft?',
    opciones: ['Alex', 'Steve', 'Herobrine', 'Creeper'],
    correcta: 1
  },
  {
    pregunta: '¿En qué juego aparece el personaje llamado Master Chief?',
    opciones: ['Call of Duty', 'Gears of War', 'Halo', 'Doom'],
    correcta: 2
  },
  {
    pregunta: '¿Cuál es el objetivo principal de Among Us?',
    opciones: ['Construir una casa', 'Ganar carreras', 'Derrotar dragones', 'Descubrir al impostor'],
    correcta: 3
  },
  {
    pregunta: '¿Qué compañía creó PlayStation?',
    opciones: ['Sony', 'Nintendo', 'Microsoft', 'Sega'],
    correcta: 0
  },
];


const anime = [
  {
    pregunta: '¿Cómo se llama el hermano de Tanjiro en Demon Slayer?',
    opciones: ['Zenitsu', 'Nezuko', 'Inosuke', 'Giyu'],
    correcta: 1
  },
  {
    pregunta: '¿Cuál es el apellido de Sasuke en Naruto?',
    opciones: ['Uzumaki', 'Haruno', 'Uchiha', 'Hatake'],
    correcta: 2
  },
  {
    pregunta: '¿Cómo se llama el capitán de los Sombrero de Paja?',
    opciones: ['Zoro', 'Sanji', 'Ace', 'Luffy'],
    correcta: 3
  },
  {
    pregunta: '¿Quién es el maestro de Goku durante su infancia?',
    opciones: ['Roshi', 'Vegeta', 'Piccolo', 'Freezer'],
    correcta: 0
  },
  {
    pregunta: '¿Qué poder utiliza Gojo Satoru en Jujutsu Kaisen?',
    opciones: ['Respiración del Sol', 'Técnica del Infinito', 'Sharingan', 'Gear 5'],
    correcta: 1
  },
];

// PASO 3. CREAR APP Y LOS ESTADOS CON useState

export default function App() {
  const [pantalla, setPantalla] = useState(1);
  const [tema, setTema] = useState(null);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [correctas, setCorrectas] = useState(0);
  const [incorrectas, setIncorrectas] = useState(0);

  // Elegimos el arreglo de preguntas según el tema (condicional)

  let preguntas = [];

  if (tema === 'videojuegos') {
    preguntas = videojuegos;
  } else if (tema === 'anime') {
    preguntas = anime;
  }

  const actual = preguntas[indice];

  // PASO 4. FUNCIONES DE LA LÓGICA DEL JUEGO

  function elegirTema(t) {
    setTema(t);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);

    if (t === 'videojuegos') {
      setPantalla(3);
    } else {
      setPantalla(4);
    }
  }

  function responder(i) {
    setSeleccion(i);

    if (i === actual.correcta) {
      setCorrectas(correctas + 1);
    } else {
      setIncorrectas(incorrectas + 1);
    }
  }

  function siguiente() {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
      setSeleccion(null);
    } else {
      setPantalla(5);
    }
  }

  function volverAJugar() {
    setTema(null);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);
    setPantalla(2);
  }

  // PASO 5. PANTALLAS 1 Y 2: PRESENTACIÓN Y TEMAS

  if (pantalla === 1) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.logo}>🎮</Text>
        <Text style={styles.titulo}>QuizZone</Text>
        <Text style={styles.subtitulo}>¡Demuestra cuánto sabes!</Text>
        <Button title="Comenzar" onPress={() => setPantalla(2)} />
      </View>
    );
  }

  if (pantalla === 2) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Selecciona un tema</Text>

        <View style={styles.espacio}>
          <Button title="🎮 Videojuegos" onPress={() => elegirTema('videojuegos')} />
        </View>

        <View style={styles.espacio}>
          <Button title="🌸 Anime" onPress={() => elegirTema('anime')} />
        </View>

        <View style={styles.espacio}>
          <Button title="Atrás" color="#7a869a" onPress={() => setPantalla(1)} />
        </View>
      </View>
    );
  }

  // PASO 6. PANTALLAS 3 Y 4: PREGUNTAS

  if (pantalla === 3 || pantalla === 4) {
    let mensaje = '';

    if (seleccion !== null) {
      if (seleccion === actual.correcta) {
        mensaje = '¡Correcto! 🎉';
      } else {
        mensaje = 'Incorrecto. La respuesta era: ' + actual.opciones[actual.correcta];
      }
    }

    return (
      <View style={styles.contenedor}>
        <Text style={styles.tema}>
          {tema === 'videojuegos' ? '🎮 Videojuegos' : '🌸 Anime'}
        </Text>

        <Text style={styles.contador}>
          Pregunta {indice + 1} de {preguntas.length} · Puntaje: {correctas}
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.pregunta}>{actual.pregunta}</Text>
        </View>

        <View style={styles.espacio}>
          <Button
            title={'A. ' + actual.opciones[0]}
            onPress={() => responder(0)}
            disabled={seleccion !== null}
          />
        </View>

        <View style={styles.espacio}>
          <Button
            title={'B. ' + actual.opciones[1]}
            onPress={() => responder(1)}
            disabled={seleccion !== null}
          />
        </View>

        <View style={styles.espacio}>
          <Button
            title={'C. ' + actual.opciones[2]}
            onPress={() => responder(2)}
            disabled={seleccion !== null}
          />
        </View>

        <View style={styles.espacio}>
          <Button
            title={'D. ' + actual.opciones[3]}
            onPress={() => responder(3)}
            disabled={seleccion !== null}
          />
        </View>

        {seleccion !== null && (
          <View>
            <Text style={seleccion === actual.correcta ? styles.bien : styles.mal}>
              {mensaje}
            </Text>

            <Button
              title={indice < preguntas.length - 1 ? 'Siguiente' : 'Ver resultados'}
              color="#239455"
              onPress={siguiente}
            />
          </View>
        )}
      </View>
    );
  }

  // PASO 7. PANTALLA 5: RESULTADOS

  let mensajeFinal = '';

  if (correctas >= 4) {
    mensajeFinal = '¡Excelente! Tienes grandes conocimientos 🏆';
  } else if (correctas >= 3) {
    mensajeFinal = '¡Muy bien! Casi lo logras 👏';
  } else {
    mensajeFinal = '¡Sigue practicando! 💪';
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.logo}>🏆</Text>
      <Text style={styles.titulo}>¡Juego terminado!</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>Tu puntaje</Text>
        <Text style={styles.puntaje}>{correctas} / {preguntas.length}</Text>
      </View>

      <View style={styles.fila}>
        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Correctas</Text>
          <Text style={styles.miniValor}>{correctas}</Text>
        </View>

        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Incorrectas</Text>
          <Text style={styles.miniValor}>{incorrectas}</Text>
        </View>
      </View>

      <Text style={styles.final}>{mensajeFinal}</Text>

      <Button title="Volver a jugar" onPress={volverAJugar} />
    </View>
  );
}

// PASO 8. ESTILOS CON StyleSheet

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#eef4ff'
  },

  logo: {
    fontSize: 64,
    textAlign: 'center'
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#173b83',
    marginBottom: 10
  },

  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#596579',
    marginBottom: 25
  },

  espacio: {
    marginBottom: 12
  },

  tema: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2457c5'
  },

  contador: {
    fontSize: 14,
    textAlign: 'center',
    color: '#596579',
    marginVertical: 8
  },

  tarjeta: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16
  },

  pregunta: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#202b3c'
  },

  bien: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#239455',
    marginVertical: 10
  },

  mal: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#c33c3c',
    marginVertical: 10
  },

  etiqueta: {
    fontSize: 14,
    textAlign: 'center',
    color: '#596579'
  },

  puntaje: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2457c5'
  },

  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  mini: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12
  },

  miniValor: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#202b3c'
  },

  final: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 18
  },
});
