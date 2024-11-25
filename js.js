function calcularTriangulo() {
    // Obtener los valores de los lados
    let a = parseFloat(document.getElementById("lado a").value);  // Base
    let b = parseFloat(document.getElementById("lado b").value);  // Lado derecho
    let c = parseFloat(document.getElementById("lado c").value);  // Lado izquierdo

    // Verificar si los lados cumplen con la desigualdad triangular
    if (a + b <= c || a + c <= b || b + c <= a) {
        alert("¡Los lados proporcionados no forman un triángulo válido! Intenta con otros valores.");
        return;  // Salir de la función si no es un triángulo válido
    }

    // Determinar el tipo de triángulo por lados
    let tipoPorLados = tipoTrianguloPorLados(a, b, c);
    let angulos = calcularAngulos(a, b, c);

    // Determinar el tipo de triángulo por ángulos
    let tipoPorAngulos = tipoTrianguloPorAngulos(angulos);

    // Mostrar los resultados
    let tipoTrianguloTexto = `Tipo de triángulo: ${tipoPorLados} (${tipoPorAngulos})`;
    let angulosTexto = `Ángulos: A = ${angulos[0].toFixed(2)}°, B = ${angulos[1].toFixed(2)}°, C = ${angulos[2].toFixed(2)}°`;

    document.getElementById("tipoTriangulo").innerText = tipoTrianguloTexto;
    document.getElementById("angulosTriangulo").innerText = angulosTexto;

    // Dibujar el triángulo visualmente con las proporciones correctas
    dibujarTrianguloConAngulos(a, b, c, angulos);
}

function tipoTrianguloPorLados(a, b, c) {
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

function tipoTrianguloPorAngulos(angulos) {
    let [A, B, C] = angulos;
    
    if (A === 90 || B === 90 || C === 90) {
        return "Rectángulo";
    } else if (A > 90 || B > 90 || C > 90) {
        return "Obtusángulo";
    } else {
        return "Acutángulo";
    }
}

function dibujarTrianguloConAngulos(a, b, c, angulos) {
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

    // Vértices en función de los ángulos (usando trigonometría)
    let x3 = x1 + scaledBase * Math.cos(angulos[0] * Math.PI / 180); // Cálculo de x para el vértice superior
    let y3 = y1 - scaledHeight * Math.sin(angulos[0] * Math.PI / 180); // Cálculo de y para el vértice superior

    // Dibujar el triángulo en el canvas
    ctx.beginPath();
    ctx.moveTo(x1, y1);  // Empieza desde el primer punto
    ctx.lineTo(x2, y2);  // Dibuja la base
    ctx.lineTo(x3, y3);  // Dibuja el lado izquierdo
    ctx.closePath();     // Cierra el triángulo

    // Establecer el color dependiendo del tipo de triángulo
    ctx.fillStyle = getColorPorTipo(tipoTrianguloPorLados(a, b, c));
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
