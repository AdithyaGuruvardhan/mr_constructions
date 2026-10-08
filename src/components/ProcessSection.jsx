import { T, Editable, EditableImg, useList, ItemTools, AddItem } from '../content/editable';

const DEFAULT_STEPS = [
  { title: '1. Strategic Design', text: 'Comprehensive site analysis and detailed\n3D architectural modeling.', image: '/infosys_plan (1).webp', imageClass: 'object-center bg-white scale-[1.2]' },
  { title: '2. Structural Integrity', text: 'Utilizing premium materials with\nadvanced framing technology.', image: '/infosys_top_view.webp', imageClass: 'scale-[1.2]' },
  { title: '3. Final Handover', text: 'Rigorous quality inspections\nensuring zero defects before move-in.', image: '/INFOSYS HUBLI29.webp', imageClass: 'object-center' },
];

export default function ProcessSection() {
  const steps = useList('home.process.steps', DEFAULT_STEPS);

  return (
    <section className="bg-white py-20 px-6 md:px-16 w-full">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

        {/* Left Column - Text and Main Image */}
        <div className="w-full lg:w-3/5 flex flex-col">
          <h2 className="text-3xl md:text-[2.75rem] font-medium text-[#2c52a1] leading-tight mb-6">
            <T k="home.process.title">{'Meticulous Planning &\nFlawless Execution'}</T>
          </h2>
          <p className="text-[#6b6b6b] text-lg mb-10 leading-relaxed max-w-2xl">
            <T k="home.process.text">{'Our service range spans Design, Civil, Infrastructure, Finishing Works, and MEP (Mechanical, Electrical, Plumbing) services.\nOur core differentiators are affordability, on-time delivery, quality assurance, and deep sector experience—backed by a strong safety record.'}</T>
          </p>

          {/* Cropped Building Plan Image */}
          {/* <div className="w-full h-[280px] md:h-[355px] overflow-hidden rounded-[2rem] relative group">
            <img
              src="/infosys_plan.webp"
              alt="Building Blueprint"
              className="w-full h-full object-cover object-[center_46%] scale-[0.6] absolute inset-0"
            />
            <img
              src="/infosys_plan (2).png"
              alt="Building Blueprint Color"
              className="w-full h-full object-cover object-[center_45%] scale-[0.7] absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
            />
          </div> */}
        </div>

        {/* Right Column - Process Cards */}
        <div className="w-full lg:w-2/5 flex flex-col gap-5">

          {steps.items.map((step, i) => (
            <div key={i} className="relative bg-[#2c2d3c] rounded-[1.5rem] flex items-stretch p-3 shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <ItemTools list={steps} index={i} vertical className="-top-3 right-3" />
              <div className="w-24 md:w-28 h-auto min-h-[90px] flex-shrink-0 bg-gray-300 relative rounded-xl overflow-hidden">
                <EditableImg src={step.image} onChange={v => steps.update(i, { image: v })} alt="" className={`absolute inset-0 w-full h-full object-cover ${step.imageClass ?? 'object-center'}`} />
              </div>
              <div className="p-4 md:px-6 flex flex-col justify-center">
                <h3 className="text-white font-medium text-lg mb-2"><Editable value={step.title} onChange={v => steps.update(i, { title: v })} /></h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <Editable value={step.text} onChange={v => steps.update(i, { text: v })} />
                </p>
              </div>
            </div>
          ))}
          <AddItem label="Add step" onAdd={() => steps.add({ title: `${steps.items.length + 1}. New Step`, text: 'Describe this step.', image: '/building.webp' })} />

        </div>

      </div>
    </section>
  );
}
