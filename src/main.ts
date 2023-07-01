import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";

import { VoiceRecognizer } from "./voice-recognition-online.ts";

var voiceRecognizer = new VoiceRecognizer();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div class="voice-recognition">
      <button id="start-listening" type="button"> Start Listening</button>
      <button id="stop-listening" type="button">Stop Listening</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

const startListningBtn =
  document.querySelector<HTMLButtonElement>("#start-listening");
if (startListningBtn) {
  startListningBtn.onclick = voiceRecognizer.startListening;
}
const stopListningBtn =
  document.querySelector<HTMLButtonElement>("#stop-listening");
if (stopListningBtn) {
  stopListningBtn.onclick = voiceRecognizer.stopListening;
}
setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
