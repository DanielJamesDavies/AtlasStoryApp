// Packages
import { useCallback } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const AIAssistantMicrophoneLogic = ({ microphone }) => {
	const getIsSpeaking = useCallback(async (inverted) => {
		let durationNotSpoken = 0;

		return await new Promise((resolve) => {
			const audio_device = navigator.mediaDevices.getUserMedia({ audio: true });
			audio_device.then((stream) => {
				const audioContext = new AudioContext();

				const analyser = audioContext.createAnalyser();
				analyser.smoothingTimeConstant = 0.8;
				analyser.fftSize = 1024;

				const source = audioContext.createMediaStreamSource(stream);
				const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

				source.connect(analyser);
				analyser.connect(scriptProcessor);
				scriptProcessor.connect(audioContext.destination);
				scriptProcessor.onaudioprocess = () => {
					const array = new Uint8Array(analyser.frequencyBinCount);
					analyser.getByteFrequencyData(array);
					const average = array.reduce((e, value) => e + value, 0) / array.length;

					const isSpeaking = Math.round(average) > 10;

					if (isSpeaking) {
						durationNotSpoken = 0;
					} else {
						durationNotSpoken++;
					}

					if (isSpeaking && !inverted) resolve(true);
					if (!isSpeaking && inverted && durationNotSpoken > 25) resolve(false);
				};
			});
		});
	}, []);

	const getAudioFile = useCallback(async () => {
		return await new Promise(async (resolve) => {
			let audio_file = false;

			await getIsSpeaking();

			microphone.current.then((stream) => {
				let recorder = new MediaRecorder(stream);
				let audio = [];

				recorder.ondataavailable = (e) => {
					audio.push(e.data);

					if (recorder.state === "inactive") {
						const blob = new Blob(audio, { type: "audio/webm" });
						audio_file = new File([blob], "audio.webm", { type: blob.type });
						resolve(audio_file);
					}
				};
				recorder.start(50);
				setTimeout(() => {
					recorder?.stop();
				}, 10000);

				async function stopOnSilence() {
					await getIsSpeaking(true);
					recorder?.stop();
				}
				stopOnSilence();
			});
		});
	}, [microphone, getIsSpeaking]);

	return { getAudioFile };
};
