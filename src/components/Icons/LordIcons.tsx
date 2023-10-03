//@ts-nocheck
import Lottie from "lottie-web";
import { useEffect } from "react";

const loadIcons = async () => {
  const { defineElement } = await import("lord-icon-element");
  defineElement(Lottie.loadAnimation);
};

const Pending = () => (
  <lord-icon
    src="https://cdn.lordicon.com/qznlhdss.json"
    trigger="loop"
    colors="primary:#fdc25f"
    style={{ width: "22px", height: "22px" }}
  />
);

const Trash = () => (
  <lord-icon
    src="https://cdn.lordicon.com/kfzfxczd.json"
    trigger="loop-on-hover"
    colors="primary:#007aff"
    state="hover-empty"
    style={{ width: "28px", height: "28px" }}
  />
);

const Help = () => (
  <lord-icon
    src="https://cdn.lordicon.com/enzmygww.json"
    trigger="loop-on-hover"
    colors="primary:#007aff"
    style={{ width: "28px", height: "28px" }}
  />
);

const Repeat = () => (
  <lord-icon
    src="https://cdn.lordicon.com/akuwjdzh.json"
    trigger="loop"
    colors="primary:#ffffff"
    style={{ width: "28px", height: "28px" }}
  />
);

const Check = () => (
  <lord-icon
    src="https://cdn.lordicon.com/egiwmiit.json"
    trigger="hover"
    colors="primary:#02f19d"
    style={{ width: "28px", height: "28px" }}
  />
);

const QrHome = () => (
  <lord-icon
    src="https://cdn.lordicon.com/szpdhodo.json"
    trigger="loop"
    colors="primary:#c31d98,secondary:#4fb8f1"
    style={{ width: "150px", height: "150px" }}
  />
);

const ReceiveHome = () => (
  <lord-icon
    src="https://cdn.lordicon.com/isdxbcqi.json"
    trigger="loop"
    colors="primary:#c31d98,secondary:#4fb8f1"
    style={{ width: "150px", height: "150px" }}
  />
);

const SendHome = () => (
  <lord-icon
    src="https://cdn.lordicon.com/gowrcrni.json"
    trigger="loop"
    colors="primary:#c31d98,secondary:#4fb8f1"
    style={{ width: "150px", height: "150px" }}
  />
);

const ConnectHome = () => (
  <lord-icon
    src="https://cdn.lordicon.com/dskrskur.json"
    trigger="loop"
    colors="primary:#c31d98,secondary:#4fb8f1"
    style={{ width: "200px", height: "200px" }}
  />
);

const SignHome = () => (
  <lord-icon
    src="https://cdn.lordicon.com/eaawyrxp.json"
    trigger="loop"
    colors="primary:#c31d98,secondary:#4fb8f1"
    style={{ width: "200px", height: "200px" }}
  />
);

const Share = () => (
  <lord-icon
    src="https://cdn.lordicon.com/wxhtpnnk.json"
    trigger="loop-on-hover"
    colors="primary:#fff"
    style={{ width: "28px", height: "28px" }}
  />
);

const LordIcon = ({ type }) => {
  useEffect(() => {
    loadIcons();
  }, []);

  switch (type) {
    case "pending":
      return <Pending />;

    case "trash":
      return <Trash />;

    case "help":
      return <Help />;

    case "repeat":
      return <Repeat />;

    case "check":
      return <Check />;

    case "qrhome":
      return <QrHome />;

    case "receivehome":
      return <ReceiveHome />;

    case "sendhome":
      return <SendHome />;

    case "connecthome":
      return <ConnectHome />;

    case "signhome":
      return <SignHome />;

    case "share":
      return <Share />;

    default:
      return null;
  }
};

export default LordIcon;
