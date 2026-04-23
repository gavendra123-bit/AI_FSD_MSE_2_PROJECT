function AuthCard({ title, subtitle, children }) {
  return (
    <div className="auth-shell">
      <div className="auth-card shadow-lg">
        <h1 className="auth-title">{title}</h1>
        <p className="auth-subtitle">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

export default AuthCard;
