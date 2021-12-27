import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import "./style.scss";

const Toggle = (props) => {
  const {
    className,
    id,
    name,
    value,
    offRender,
    onRender,
    onToggle,
    onFocus,
    onBlur,
  } = props;
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(value);
  });

  return (
    <div
      className={`toggle ${className}`}
      id={id}
      name={name}
      onClick={!disalbed ? onToggle : null}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className={`toggle-background ${toggle ? "checked" : "unchecked"}`}>
        <motion.div
          animate={{ opacity: toggle ? 1 : 0 }}
          className="toggle-right-content"
        >
          {onRender}
        </motion.div>
        <motion.div
          animate={{ opacity: !toggle ? 1 : 0 }}
          className="toggle-left-content"
        >
          {offRender}
        </motion.div>
      </div>
      <div className="toggle-switcher">
        <div
          className={`toggle-ball-${toggle ? "checked" : "unchecked"}`}
        ></div>
        <input className="toggle-check" type="checkbox" value={toggle} />
      </div>
    </div>
  );
};

Toggle.displayName = "Toggle";

Toggle.defaultProps = {
  className: "",
  name: "",
  id: "",
  disabled: false,
  value: false,
  offRender: <></>,
  onRender: <></>,
  onToggle: null,
  onFocus: null,
  onBlur: null,
};

Toggle.protoTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  offRender: PropTypes.element,
  onRender: PropTypes.element,
};

export default Toggle;
