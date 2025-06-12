// definindo variáveis globais
let jardineiro;
let plantas = [];
let temperatura = 10; // Representa a poluição
let score = 0; // Novo score para árvores plantadas

function setup() {
  createCanvas(800, 600); // Aumentei o tamanho da tela para melhor visualização
  jardineiro = new Jardineiro(width / 2, height - 50);
}

function draw() {
  // Usando map() para ajustar a cor de fundo de forma mais controlada
  // A cor de fundo muda de laranja (poluído) para verde claro (limpo) conforme o score aumenta
  let corFundo = lerpColor(color(217, 112, 26), color(219, 239, 208),
    map(score, 0, 50, 0, 1)); // Mudei de totalArvores para score e ajustei o range
  background(corFundo);

  mostrarInformacoes();

  // A temperatura (poluição) aumenta gradualmente se não houver árvores sendo plantadas
  temperatura += 0.05; // Ajuste o ritmo de aumento da poluição
  if (temperatura > 100) temperatura = 100; // Limita a temperatura máxima

  jardineiro.atualizar();
  jardineiro.mostrar();

  // Desenha cada árvore plantada
  for (let i = 0; i < plantas.length; i++) {
    plantas[i].mostrar();
  }

  // Verifica se o jogo acabou
  verificarFimDeJogo();
}

// --- Classes ---
class Jardineiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidade = 5;
    this.largura = 40;
    this.altura = 60;
  }

  atualizar() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.velocidade;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.velocidade;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.velocidade;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.velocidade;
    }

    // Limita o jardineiro dentro da tela
    this.x = constrain(this.x, 0, width - this.largura);
    this.y = constrain(this.y, 0, height - this.altura);
  }

  mostrar() {
    fill(99, 58, 20); // Cor marrom para o jardineiro
    rect(this.x, this.y, this.largura, this.altura);
    fill(0, 150, 0); // Chapéu verde
    rect(this.x, this.y - 10, this.largura, 10);
  }
}

class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanhoTronco = 30;
    this.alturaTronco = 50;
    this.tamanhoCopa = 60;
  }

  mostrar() {
    // Tronco
    fill(139, 69, 19); // Marrom
    rect(this.x, this.y, this.tamanhoTronco, this.alturaTronco);

    // Copa da árvore
    fill(34, 139, 34); // Verde floresta
    ellipse(this.x + this.tamanhoTronco / 2, this.y - this.tamanhoCopa / 2, this.tamanhoCopa, this.tamanhoCopa);
  }
}

// --- Funções do Jogo ---

// Função para mostrar as informações na tela
function mostrarInformacoes() {
  textSize(20);
  fill(0);
  text("Score: " + score, 10, 30); // Mostra o score na parte superior esquerda
  textSize(14);
  fill("black");
  text("Poluição (Temperatura): " + temperatura.toFixed(2), 10, height - 30);
  text("Árvores plantadas: " + score, width - 150, height - 30); // Informação mais precisa

  fill(0);
  textSize(16);
  text("Para movimentar o jardineiro use as setas do teclado.", 10, 60);
  text("Para plantar árvores use P ou ESPAÇO.", 10, 80);
}

// Função para verificar se o jogo acabou
function verificarFimDeJogo() {
  if (score >= 50 && temperatura < 20) { // Condição de vitória ajustada
    mostrarMensagemDeVitoria();
  } else if (temperatura >= 80) { // Condição de derrota: poluição muito alta
    mostrarMensagemDeDerrota();
  }
}

function mostrarMensagemDeVitoria() {
  fill(0, 200, 0, 200); // Verde com transparência
  rect(0, height / 2 - 50, width, 100);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("VITÓRIA! O planeta está salvo!", width / 2, height / 2);
  noLoop(); // Pausa o jogo
}

function mostrarMensagemDeDerrota() {
  fill(200, 0, 0, 200); // Vermelho com transparência
  rect(0, height / 2 - 50, width, 100);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("DERROTA! O planeta está muito poluído.", width / 2, height / 2);
  noLoop(); // Pausa o jogo
}

// Função para criar e plantar uma árvore
function keyPressed() {
  if (key === ' ' || key === 'p' || key === 'P') {
    let arvore = new Arvore(jardineiro.x + jardineiro.largura / 2 - 15, jardineiro.y - jardineiro.alturaTronco); // Ajusta a posição da árvore
    plantas.push(arvore);
    score++; // Incrementa o score
    temperatura -= 5; // Diminui a poluição
    if (temperatura < 0) temperatura = 0; // Garante que a temperatura não seja negativa
  }
}
