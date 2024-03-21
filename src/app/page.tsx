import CreateAccountForm from "@/components/forms/CreateAccountForm";

export default function Home() {
  return (
    <section className="pt-32">
      <div className="max-w-md mb-6">
        <h1 className="text-6xl font-bold">
          Your one link <br /> for everything
        </h1>
        <h2 className="text-gray-500 text-xl mt-6">
          Share your links, music, social profiles, contact information and more
          on one page
        </h2>
      </div>

      <CreateAccountForm />
    </section>
  );
}
