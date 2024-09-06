import { SignIn } from "@clerk/nextjs";
import Logo from "../../../_components/Logo";

export default function Page() {
  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-indigo-600 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Abstract financial technology background"
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <Logo />

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to FinanSmart: Your Financial Compass 🧭
            </h2>

            <p className="mt-4 leading-relaxed text-gray-300">
              Manage your finances smarter with our intuitive tools and expert insights.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <Logo />

              <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to FinanSmart: Your Financial Compass 🧭
              </h1>

              <p className="mt-4 leading-relaxed text-gray-300">
                Manage your finances smarter with our intuitive tools and expert insights.
              </p>
            </div>

            <div className="mt-8 bg-gray-800 p-8 shadow-lg rounded-lg border border-gray-700">
              <SignIn appearance={{
                elements: {
                  formButtonPrimary: 
                    'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
                  socialButtonsBlockButton: 
                    'border-gray-600 text-gray-200 hover:bg-gray-700 text-sm normal-case',
                  formFieldInput: 
                    'bg-gray-700 border-gray-600 text-white',
                  footerActionLink: 
                    'text-blue-400 hover:text-blue-300',
                },
              }} />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
