function calcularTriangulo() {
    // Obtener los valores de los lados
    let a = parseFloat(document.getElementById("ladoA").value);  // Base
    let b = parseFloat(document.getElementById("ladoB").value);  // Lado derecho
    let c = parseFloat(document.getElementById("ladoC").value);  // Lado izquierdo

    // Verificar si los lados cumplen con la desigualdad triangular
    if (a + b <= c || a + c <= b || b + c <= a) {
        alert("¡Los lados proporcionados no forman un triángulo válido! Intenta con otros valores.");
        return;  // Salir de la función si no es un triángulo válido
    }

    // Establecer un valor mínimo de 5 para los lados
    a = Math.max(a, 5);
    b = Math.max(b, 5);
    c = Math.max(c, 5);

    // Determinar el tipo de triángulo
    let tipo = tipoTriangulo(a, b, c);
    let angulos = calcularAngulos(a, b, c);
    let tipoTrianguloTexto = `Tipo de triángulo: ${tipo}`;
    let angulosTexto = `Ángulos: A = ${angulos[0].toFixed(2)}°, B = ${angulos[1].toFixed(2)}°, C = ${angulos[2].toFixed(2)}°`;

    // Mostrar los resultados
    document.getElementById("tipoTriangulo").innerText = tipoTrianguloTexto;
    document.getElementById("angulosTriangulo").innerText = angulosTexto;

    // Dibujar el triángulo visualmente con las proporciones correctas
    dibujarTriangulo(a, b, c);
}

function tipoTriangulo(a, b, c) {
    if (a === b && b === c) {
        return "Equilátero";
    } else if (a === b || b === c || a === c) {
        return "Isósceles";
    } else {
        return "Escaleno";
    }
}

function calcularAngulos(a, b, c) {
    let A = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
    let B = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
    let C = 180 - A - B;
    return [A, B, C];
}

function dibujarTriangulo(a, b, c) {
    // Obtener el contexto del canvas
    let canvas = document.getElementById("trianguloCanvas");
    let ctx = canvas.getContext("2d");

    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Establecer límites para el tamaño del triángulo
    let maxWidth = canvas.width - 40; // 40px de margen
    let maxHeight = canvas.height - 40; // 40px de margen

    // Limitar la base para asegurarse de que no sea demasiado grande para el canvas
    let base = Math.min(a, maxWidth);
    let altura = calcularAltura(a, b, c);

    // Limitar la altura para que no se salga del canvas
    altura = Math.min(altura, maxHeight);

    // Escalar los valores para ajustarlos dentro del canvas
    let scaleFactor = Math.min(maxWidth / a, maxHeight / altura);

    // Aplicar el factor de escala
    let scaledBase = a * scaleFactor;
    let scaledHeight = altura * scaleFactor;

    // Posición de la base en el canvas (centrado)
    let x1 = (canvas.width - scaledBase) / 2;
    let y1 = canvas.height - 30; // Ajustar para que quede dentro del canvas

    let x2 = x1 + scaledBase; // Base del triángulo
    let y2 = y1;

    // Coordenadas del vértice superior
    let x3 = (x1 + x2) / 2;
    let y3 = y1 - scaledHeight;

    // Dibujar el triángulo en el canvas
    ctx.beginPath();
    ctx.moveTo(x1, y1);  // Empieza desde el primer punto
    ctx.lineTo(x2, y2);  // Dibuja la base
    ctx.lineTo(x3, y3);  // Dibuja el lado izquierdo
    ctx.closePath();     // Cierra el triángulo

    // Establecer el color dependiendo del tipo de triángulo
    ctx.fillStyle = getColorPorTipo(tipoTriangulo(a, b, c));
    ctx.fill();
    ctx.stroke();  // Dibuja el contorno
}

function calcularAltura(a, b, c) {
    // Usamos la ley de cosenos para calcular la altura
    let s = (a + b + c) / 2;  // Semiperímetro
    let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));  // Área usando la fórmula de Herón
    return (2 * area) / a;  // Altura = (2 * área) / base
}

function getColorPorTipo(tipo) {
    if (tipo === "Equilátero") {
        return "#4CAF50";  // Verde
    } else if (tipo === "Isósceles") {
        return "#2196F3";  // Azul
    } else if (tipo === "Escaleno") {
        return "#FF5722";  // Naranja
    }
}
