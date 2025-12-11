export default function Button({
  children,
  href,
  variant = "primary",
  size = "medium",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  const baseStyles =
    "font-montserrat font-bold rounded transition-colors inline-block text-center";

  const variants = {
    primary: "bg-[#FF0000] text-white hover:bg-[#CC0000]",
    secondary:
      "bg-white text-black border-2 border-black hover:bg-black hover:text-white",
    outline:
      "bg-transparent text-[#FF0000] border-2 border-[#FF0000] hover:bg-[#FF0000] hover:text-white",
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
