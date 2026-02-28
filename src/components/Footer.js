export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-8 py-24">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">

          {/* LEFT SECTION */}
          <div className="space-y-6">
            <h2 className="text-4xl font-light tracking-wide">
              LANNA LOOM
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              งานแฮนด์เมดจากทั่วทุกมุมไทย
            </p>
          </div>

          {/* TEAM COLUMN 1 */}
          <div className="space-y-10">

            <div className="border-l border-gray-700 pl-6">
              <h3 className="text-lg font-medium tracking-wide">
                นางสาวปลายฝน แสงฟ้า (108-3)
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                คณะวิทยาการคอมพิวเตอร์
              </p>
            </div>

            <div className="border-l border-gray-700 pl-6">
              <h3 className="text-lg font-medium tracking-wide">
                นางสาวโฆษิตา สรสิทธิ์ (112-5)
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                คณะวิทยาการคอมพิวเตอร์
              </p>
            </div>

            <div className="border-l border-gray-700 pl-6">
              <h3 className="text-lg font-medium tracking-wide">
                นางสาวดิลธิดา กล้าแข็ง (115-8)
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                คณะวิทยาการคอมพิวเตอร์
              </p>
            </div>

          </div>

          {/* TEAM COLUMN 2 */}
          <div className="space-y-10">

            <div className="border-l border-gray-700 pl-6">
              <h3 className="text-lg font-medium tracking-wide">
                นางสาวปภานัน วิรุฬห์พงศ์ (117-4)
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                คณะวิทยาการคอมพิวเตอร์
              </p>
            </div>

            <div className="border-l border-gray-700 pl-6">
              <h3 className="text-lg font-medium tracking-wide">
                นางสาวศิริลักษณ์ แซ่เลา (134-9)
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                คณะวิทยาการคอมพิวเตอร์
              </p>
            </div>

            <div className="border-l border-gray-700 pl-6">
              <h3 className="text-lg font-medium tracking-wide">
                นางสาวศุภิสรา ดำเรือง (135-6)
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                คณะวิทยาการคอมพิวเตอร์
              </p>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}