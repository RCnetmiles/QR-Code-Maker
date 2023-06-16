const coinsPerScan = 10; // Número de moedas concedidas por leitura de QR code
let totalCoins = 0; // Total de moedas do usuário

// Mapeamento dos QR codes e seus textos correspondentes
const qrCodeTexts = {
  "CNC Laser": "É uma maquina CNC a Laser",
  "qr-code-2": "Texto do QR code 2",
  "qr-code-3": "Texto do QR code 3",
  // Adicione mais QR codes e seus respectivos textos aqui
};

// Função para atualizar o total de moedas exibido na página
function updateCoins() {
  const coinsElement = document.getElementById('coins');
  coinsElement.innerText = `Moedas: ${totalCoins}`;
}

// Função para processar o texto do QR code
function processQRCodeText(text) {
  const qrCodeResultElement = document.getElementById('qr-code-result');
  qrCodeResultElement.innerText = text;

  totalCoins += coinsPerScan;
  updateCoins();
}

// Função executada quando um QR code é lido
function onQRCodeRead(text) {
  if (text) {
    processQRCodeText(text);
  }
}

// Função executada quando o botão de retornar é clicado
function onReturnButtonClick() {
  const qrCodeResultElement = document.getElementById('qr-code-result');
  qrCodeResultElement.innerText = '';
}

// Configuração do leitor de QR code
const html5QrCode = new Html5Qrcode('reader');
html5QrCode.start(
  { facingMode: 'environment' }, // Use a câmera traseira do dispositivo
  { fps: 10, qrbox: 250 }, // Configurações de leitura
  (text) => {
    // Verifica se o texto do QR code está mapeado no objeto qrCodeTexts
    if (qrCodeTexts.hasOwnProperty(text)) {
      const qrCodeText = qrCodeTexts[text];
      onQRCodeRead(qrCodeText);
    }
  } // Função executada quando um QR code é lido
);

// Evento de clique do botão de retornar
const returnButton = document.getElementById('return-button');
returnButton.addEventListener('click', onReturnButtonClick);
