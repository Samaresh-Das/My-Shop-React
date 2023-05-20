import { Fragment } from "react";
import ReactDOM from "react-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import { useSelector } from "react-redux";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  console.log(props.theme);
  return (
    <div
      className={classes.modal}
      style={
        props.theme === "dark"
          ? {
              background:
                "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
            }
          : props.theme === "light" && { background: "white" }
      }
    >
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const themeMode = useSelector((state) => state.theme.theme);
  const iconColor = themeMode === "dark" ? "white" : "black";
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay theme={themeMode}>
          {" "}
          <IconContext.Provider
            value={{
              color: iconColor,
              className: "global-class-name cart-icon",
              size: "3em",
            }}
          >
            <div
              onClick={props.onClose}
              className="close-cart"
              style={{ width: "39px" }}
            >
              <IoIosCloseCircle />
            </div>
          </IconContext.Provider>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
