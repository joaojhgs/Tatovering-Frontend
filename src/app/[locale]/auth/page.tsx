import SignIn from '@/components/auth/SignIn';

export default function Page() {
  return (
    <div
      className="relative flex min-h-[calc(100vh-65px)] items-center justify-center bg-gray-500 bg-cover bg-no-repeat px-4 py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1479767574301-a01c78234a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
      }}
    >
      <div className="absolute inset-0 z-0 bg-black opacity-60"></div>
      <SignIn />
    </div>
  );
}
