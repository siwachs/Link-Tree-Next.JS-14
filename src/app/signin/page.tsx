import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";

export default function SigninPage() {
  return (
    <div>
      <div className="p-4 max-w-sm mx-auto">
        <h1 className="text-4xl font-bold text-center select-none mb-6">
          Sign In
        </h1>
        <p className="text-center mb-6 text-gray-500">
          Available Authentication Methods
        </p>

        <LoginWithGoogle />
      </div>
    </div>
  );
}
