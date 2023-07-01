import * as tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";

function argMax(arr: any) {
  return arr
    .map((x: number, i: number) => [x, i])
    .reduce((r: any, a: any) => (a[0] > r[0] ? a : r))[1];
}
export class VoiceRecognizer {
  private recognizer: any;
  private wordLabels: string[];
  constructor() {
    console.log("initialise");
    // When calling `create()`, you must provide the type of the audio input.
    // The two available options are `BROWSER_FFT` and `SOFT_FFT`.
    // - BROWSER_FFT uses the browser's native Fourier transform.
    // - SOFT_FFT uses JavaScript implementations of Fourier transform
    //   (not implemented yet).
    this.recognizer = speechCommands.create("BROWSER_FFT");
    this.wordLabels = [];
    // Make sure that the underlying model and metadata are loaded via HTTPS
    // requests.
    Promise.all([this.recognizer.ensureModelLoaded()]).then(() => {
      // See the array of words that the recognizer is trained to recognize.
      console.log(this.recognizer.wordLabels(), typeof tf);
      this.wordLabels = this.recognizer.wordLabels();
    });
  }
  startListening = () => {
    // `listen()` takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields such a
    //    - includeSpectrogram
    //    - probabilityThreshold
    //    - includeEmbedding
    console.log("executes start");
    this.recognizer.listen(
      (result: any) => {
        console.log(
          result,
          this.wordLabels[argMax(Object.values(result.scores))]
        );
        // - result.scores contains the probability scores that correspond to
        //   recognizer.wordLabels().
        // - result.spectrogram contains the spectrogram of the recognized word.
      },
      {
        includeSpectrogram: true,
        probabilityThreshold: 0.75,
      }
    );
  };
  stopListening = () => {
    console.log("executes stop");
    this.recognizer.stopListening();
  };
}
