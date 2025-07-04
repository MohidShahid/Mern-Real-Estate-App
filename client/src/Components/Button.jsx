function Button({text , className , onClick , props }) {
  return (
    <button className={`btn ${className}`} onClick={onClick} {...props}>{text}</button>
  )
}

export default Button