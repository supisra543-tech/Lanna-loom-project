export default function Loading() {
  return (
    <main className="min-h-screen bg-white pt-10 pb-20">
      <div className="container mx-auto max-w-[1300px] px-6 lg:px-12 animate-pulse">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          <div className="flex-1 bg-gray-200 aspect-square" />

          <div className="w-full lg:w-[480px] space-y-6">
            <div className="h-8 bg-gray-200 w-3/4" />
            <div className="h-6 bg-gray-200 w-1/2" />
            <div className="h-12 bg-gray-200 w-full mt-10" />
            <div className="h-40 bg-gray-200 w-full mt-6" />
          </div>

        </div>

      </div>
    </main>
  );
}