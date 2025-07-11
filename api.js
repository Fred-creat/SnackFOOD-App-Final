// Configuração da API para conectar com o servidor local
// Este arquivo é necessário para a integração com o painel admin e servidor

// IP do seu computador na rede local
const LOCAL_IP = '192.168.0.115'; // IP atual da sua máquina

// URL da API que conecta com o servidor Express (server.js)
// Porta 3000 é onde o servidor está rodando
// apiConfig.js
export const API_URL = 'https://server-appsnack.onrender.com';


// Para desenvolvimento local no emulador, pode usar:
// export const API_URL = 'http://10.0.2.2:3000'; // Android Emulator
// export const API_URL = 'http://localhost:3000'; // iOS Simulator

// Para Expo Go em dispositivo físico, use o IP da sua máquina:
// export const API_URL = 'http://192.168.1.100:3000'; // Substitua pelo seu IP
