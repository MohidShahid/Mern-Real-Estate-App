function Button({text , className , OnClick , props }) {
  return (
    <button className={`btn ${className}`} onClick={OnClick} {...props}>{text}</button>
  )
}

export default Button