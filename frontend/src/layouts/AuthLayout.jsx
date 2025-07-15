function AuthLayout({ children }) {
  return (
    <div className="min-h-screen">
      {/* Global Container */}
      <main className="flex items-center justify-center min-h-screen bg-rose-50">{children}</main>
    </div>
  );
}

export default AuthLayout;
