import { useState, useEffect } from "react";
import SideImg from "../pages/images/side-auth-image.png";
import Logo from "./images/logo-light.png";
import QRCode from "qrcode";

const QrCodeApp = () => {
  const [url, setUrl] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [darkColor, setDarkColor] = useState("#FFB700FF");
  const [lightColor, setLightColor] = useState("#FFFFFFFF");
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const generateQRCode = () => {
      if (!url) {
        setQrcode("");
        return;
      }

      if (url.length > 100) {
        setError("Link or text cannot exceed 100 characters!");
        setQrcode("");
        return;
      }

      setError("");

      QRCode.toDataURL(
        url,
        {
          width: 800,
          margin: 1.5,
          color: {
            dark: darkColor,
            light: lightColor,
          },
        },
        (err, qrUrl) => {
          if (err) {
            console.error(err);
            return;
          }

          if (logo) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const img = new Image();
            img.src = qrUrl;

            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);

              const centerX = canvas.width / 2;
              const centerY = canvas.height / 2;
              const radius = 50;

              ctx.fillStyle = "#ffffff";
              ctx.beginPath();
              ctx.arc(centerX, centerY, radius + 4, 0, Math.PI * 2);
              ctx.fill();

              const logoImg = new Image();
              logoImg.src = URL.createObjectURL(logo);

              logoImg.onload = () => {
                ctx.drawImage(
                  logoImg,
                  centerX - radius,
                  centerY - radius,
                  radius * 2,
                  radius * 2
                );
                setQrcode(canvas.toDataURL());
              };
            };
          } else {
            setQrcode(qrUrl);
          }
        }
      );
    };

    generateQRCode();
  }, [url, darkColor, lightColor, logo]);

  return (
    <div className="lg:min-h-screen max-h-max flex flex-col items-center justify-center lg:bg-[#171717] bg-[#121212] font-Urbanist text-white lg:px-0 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full lg:mt-16 lg:mb-12 my-10 max-w-7xl mx-auto shadow-lg">
        <div
          className="relative hidden md:block bg-cover bg-center rounded-s-xl bg-[#121212]"
          style={{ backgroundImage: `url(${SideImg})` }}
        >
          <img
            src={Logo}
            alt="Logo"
            className=" absolute top-4 left-4 h-7 rounded-xl w-auto"
          />
        </div>

        <div className=" relative lg:p-16 px-4 bg-[#121212] ">
          <img
            src={Logo}
            alt="Logo"
            className="mb-4 h-7 rounded-xl w-auto block md:hidden"
          />

          <h1 className="text-3xl  mb-4 font-medium  tracking-wide">
            QR Generator
          </h1>
          <p className="text-gray-400 mb-8">
            Fast and easy-to-use QR code generator.
          </p>

          <div className="mb-4">
            <label htmlFor="url" className="block mb-2 text-sm">
              Enter your link or text (100 characters max.)
            </label>
            <input
              type="text"
              placeholder="e.g. https://azeezadeleye.vercel.app"
              value={url}
              maxLength={100}
              onChange={(evt) => setUrl(evt.target.value)}
              className="w-full px-6 py-3 bg-[#171717] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#c4c4c1]"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="logo" className="block mb-2 text-sm">
              Upload Logo (Optional)
            </label>
            <div className="relative">
              <input
                id="logo"
                type="file"
                accept="image/*"
                onChange={(evt) => {
                  setLogo(evt.target.files[0]);
                  setFileName(evt.target.files[0]?.name || "");
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="w-full px-6 py-3 bg-[#171717] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#fffffe]"
              >
                Choose File
              </button>
            </div>
            {fileName && (
              <p className="text-sm text-gray-400 mt-2">
                Logo Name: {fileName}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="color" className="block mb-2 text-sm">
              Select QR Code Color
            </label>
            <input
              type="color"
              value={darkColor.slice(0, 7)}
              onChange={(evt) => setDarkColor(evt.target.value + "FF")}
              style={{ backgroundColor: darkColor }}
              className="w-full px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fffffe]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="color" className="block mb-2 text-sm">
              Select QR Background Color
            </label>
            <input
              type="color"
              value={lightColor.slice(0, 7)}
              onChange={(evt) => setLightColor(evt.target.value + "FF")}
              className="w-full px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fffffe]"
              style={{ backgroundColor: lightColor }}
            />
          </div>
        </div>

        <div className="lg:px-16 lg:py-14 px-4 bg-[#121212] rounded-e-xl">
          <p className="text-center py-4">
            QR code will appear in the box below:
          </p>
          <div
            className="border-4 pt-6 lg:h-96 h-[27.5rem] px-4 rounded-xl"
            style={{ borderColor: darkColor }}
          >
            {qrcode && (
              <>
                <div className="justify-center items-center flex">
                  <img
                    src={qrcode}
                    alt="QR Code"
                    className="h-50 rounded-xl w-auto"
                  />
                </div>
                <div className="justify-center items-center flex">
                  <a
                    href={qrcode}
                    download="qrcode.png"
                    onClick={() => setDownloaded(true)} // Set the download state
                    className="lg:w-3/4 w-full my-6 py-3 text-center bg-green-600 hover:bg-green-500 transition text-white rounded-lg font-semibold"
                  >
                    Download
                  </a>
                </div>
                {downloaded && (
                  <p className="text-green-500 text-sm mt-6">
                    Your QR code has been downloaded successfully!
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>{" "}
      <p className="text-slate-50 text-sm mb-2">
        &copy; {currentYear}{" "}
        <a
          className="hover:text-yellow-600"
          href="https://azeezadeleye.vercel.app"
        >
          Abdul-Azeez O. Adeleye.
        </a>{" "}
        {""} All rights reserved.
      </p>
    </div>
  );
};

export default QrCodeApp;
