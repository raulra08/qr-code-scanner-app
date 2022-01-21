import { useState } from "react";
import { Html5Qrcode } from "html5-qrcode"
import { Html5QrcodeCameraScanConfig } from "html5-qrcode/esm/html5-qrcode";

const Dashboard = () => {
  const [scanner, setScanner] = useState<Html5Qrcode>();
  const [decodedResult, setDecodedResult] = useState(undefined);

  const qrCodeScannerConfiguration = (): Html5QrcodeCameraScanConfig => {
    let config: Html5QrcodeCameraScanConfig = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.333334
    };
    return config;
  }

  const handleScan = async () => {
    setDecodedResult(undefined);
    scanner?.start(
      { facingMode: "environment" },
      qrCodeScannerConfiguration(),
      (decodedText, decodedResult) => onScanSuccess(decodedText, decodedResult),
      (errorMessage) => handleError(errorMessage))
      .catch((err) => handleError(err));
  }

  const onScanSuccess = (decodedText: any, decodedResult: any) => {
    console.log("Text decoded resulting in: ", decodedResult);
    setDecodedResult(decodedText)
    stopScanning();
  }

  const stopScanning = (): void => {
    scanner?.stop().then((ignore) => {
      console.log("Stopped scanning")
    }).catch((err) => handleError(err));
  }

  const handleError = (err: any) => {
    console.error(err)
  }

  const cameraPermissions = () => {
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        setScanner(new Html5Qrcode("qr_reader"));
      }
    }).catch(err => handleError(err));
  }

  return (
    <>
      <h1>Dashboard</h1>

      <div style={{ marginTop: "20px", marginBottom: "20px", }}>
        <div id="qr_reader" style={{
          width: "250px",
          height: "240px",
          position: "relative"
        }} />
      </div>

      {decodedResult && <div id="handleScanResult" style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
      }} >
        <h3>{decodedResult}</h3>
      </div>}

      <div id="handleCamera" style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
      }} >
        <button type="button" onClick={cameraPermissions} style={{
          width: "200px",
          height: "40px",
          marginTop: "50px",
          marginRight: "20px",
        }}>Camera permission</button>

        <button type="button" onClick={handleScan} style={{
          width: "200px",
          height: "40px",
          marginTop: "50px",
          marginRight: "20px",
        }}>Scan</button>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        marginTop: "20px",
      }}>
        <a href="/" style={{ marginRight: "15px", }}>Previous</a>
        <a>Next</a>
      </div>
    </>
  )
}

export default Dashboard;