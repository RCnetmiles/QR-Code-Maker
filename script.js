const coinsPerScan = 10; // Número de moedas concedidas por leitura de QR code
let totalCoins = 0; // Total de moedas do usuário

// Mapeamento dos QR codes e seus textos correspondentes
const qrCodeTexts = {
  "CNC Laser": "Máquina CNC a laser",
  "qr-code-2": "Texto do QR code 2",
  "qr-code-3": "Texto do QR code 3"
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

  const returnButton = document.getElementById('return-button');
  returnButton.style.display = 'block';
}

// Função executada quando um QR code é lido
function onQRCodeRead(result) {
  if (result && result.text) {
    const qrCodeText = result.text;
    processQRCodeText(qrCodeText);
  }
}

// Função executada quando o botão de retornar é clicado
function onReturnButtonClick() {
  const qrCodeResultElement = document.getElementById('qr-code-result');
  qrCodeResultElement.innerText = '';

  const returnButton = document.getElementById('return-button');
  returnButton.style.display = 'none';
}

// Função para iniciar o leitor de QR code
function startQRCodeReader() {
  const codeReader = new ZXing.BrowserQRCodeReader();
  codeReader
    .decodeOnceFromVideoDevice(undefined, 'ar-video')
    .then((result) => {
      onQRCodeRead(result);
      startQRCodeReader(); // Continuar a leitura de QR codes após cada leitura bem-sucedida
    })
    .catch((err) => {
      console.error(err);
    });
}

// Função para parar o leitor de QR code
function stopQRCodeReader() {
  ZXing.BrowserQRCodeReader.reset();
}

// Iniciar a leitura de QR codes ao carregar a página
window.addEventListener('load', () => {
  startQRCodeReader();

  // Event listener para o botão de retornar
  const returnButton = document.getElementById('return-button');
  returnButton.addEventListener('click', onReturnButtonClick);
  returnButton.style.display = 'none';
});
