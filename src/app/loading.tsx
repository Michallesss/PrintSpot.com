import NavBar from "@/components/NavBar";
import Header from "@/components/Header";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <NavBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main>
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center">
              <div className="animate-spin w-10 h-10 border-t-2 border-b-2 border-primary rounded-full"></div>
              <p className="mt-4 text-lg font-semibold text-primary">Loading...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}