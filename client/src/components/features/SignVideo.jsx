import React, { useRef, useEffect, useState } from 'react';
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { Loader2, Camera, CameraOff } from 'lucide-react';
import { Button } from '../ui/Button';

export default function SignVideo() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [handLandmarker, setHandLandmarker] = useState(null);
  const [gestureOutput, setGestureOutput] = useState("Waiting for hands...");

  // 1. Initialize MediaPipe HandLandmarker
  useEffect(() => {
    const createHandLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      
      const landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands: 2
      });
      
      setHandLandmarker(landmarker);
      setLoading(false);
    };
    createHandLandmarker();
  }, []);

  // 2. Enable Webcam
  const enableCam = () => {
    if (!handLandmarker) return;

    if (webcamRunning) {
      setWebcamRunning(false);
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    } else {
      setWebcamRunning(true);
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictWebcam);
      });
    }
  };

  // 3. Predict / Detect Hands in Loop
  const predictWebcam = async () => {
    if (videoRef.current && videoRef.current.currentTime !== 0) {
      // Get detections
      const results = handLandmarker.detectForVideo(videoRef.current, performance.now());
      
      // Simple Logic: Check if hands are detected
      if (results.landmarks.length > 0) {
        setGestureOutput(`Hands Detected: ${results.landmarks.length}`);
        // NOTE: For full sign language, you need a custom trained model.
        // This base model just gives x,y,z coordinates of fingers.
      } else {
        setGestureOutput("No hands visible");
      }
      
      // Draw landmarks on canvas
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      // (Drawing logic omitted for brevity, but this is where you draw the skeleton)
      
      if (webcamRunning) {
        window.requestAnimationFrame(predictWebcam);
      }
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-amber-600">AI Sign Vision</h2>
        <p className="text-slate-500">Real-time Hand Tracking</p>
      </div>

      <div className="relative rounded-xl overflow-hidden bg-slate-500 aspect-video flex items-center justify-center">
        {loading && <div className="absolute text-teal-700 flex gap-2"><Loader2 className="animate-spin"/> Loading Model...</div>}
        
        <video 
          ref={videoRef} 
          className="absolute w-full h-full object-cover" 
          autoPlay 
          playsInline
        ></video>
        
        <canvas 
          ref={canvasRef} 
          className="absolute w-full h-full pointer-events-none"
        ></canvas>

        {!webcamRunning && !loading && (
          <div className="absolute z-10">
            <Button onClick={enableCam} className="bg-amber-600 text-black hover:bg-teal-700">
              <Camera size={20} /> Start Camera
            </Button>
          </div>
        )}
      </div>

      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-center">
        <p className="font-bold text-amber-800 text-lg">{gestureOutput}</p>
        <p className="text-xs text-amber-600 mt-1">
          *Basic tracking active. Full ISL translation requires custom training.*
        </p>
      </div>

      {webcamRunning && (
        <Button onClick={enableCam} variant="secondary">
          <CameraOff size={20} /> Stop Camera
        </Button>
      )}
    </div>
  );
}