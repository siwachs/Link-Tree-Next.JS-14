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

      <form className="inline-flex items-center shadow-lg">
        <span className="bg-white py-4 pl-4">linktree.to/</span>
        <input
          placeholder="username"
          className="py-4 px-2 outline-none"
          type="text"
        />
        <button className="bg-blue-500 text-white py-4 px-6" type="submit">
          Join for Free
        </button>
      </form>
    </section>
  );
}
