import React from 'react';

const Browser = () => {
  return (
    <div 
      className="w-[540px] h-[450px] bg-neutral-100 rounded-lg flex flex-col overflow-hidden relative"
      style={{ boxShadow: '5px 5px 10px rgba(31, 31, 31, 0.245)' }}
    >
      {/* Tabs Header */}
      <div className="bg-[#353535] h-[72px] flex justify-between items-end pl-9">
        <div className="flex">
          <div className="relative w-[180px] h-[61px] rounded-tl-[13px] rounded-tr-[13px] bg-[#515151] flex items-start justify-between gap-2 p-[7px_14px]">
            {/* Right Mask */}
            <div className="absolute top-0 right-0 h-[43px] w-[36px] translate-x-full overflow-hidden bg-[#515151]">
              <div style={{ borderRadius: '0 0 0 13px' }} className="w-full h-full bg-[#353535]"></div>
            </div>
            
            {/* Left Mask */}
            <div className="absolute top-0 left-0 h-[43px] w-[36px] -translate-x-full overflow-hidden bg-[#515151]">
              <div style={{ borderRadius: '0 0 13px 0' }} className="w-full h-full bg-[#353535]"></div>
            </div>
            
            <span className="text-white text-[18px]">Skygen.ai</span>
            <div className="text-white text-[16px] p-[2px_7px] rounded-full cursor-default hover:bg-[#5d5d5d]">✕</div>
          </div>
        </div>
        
        <div className="flex">
          <button className="h-[54px] w-[54px] border-none bg-transparent transition ease-out duration-100 text-white mb-[18px] hover:bg-[#515151c8] text-[22px]">-</button>
          <button className="h-[54px] w-[54px] border-none bg-transparent transition ease-out duration-100 text-white mb-[18px] hover:bg-[#515151c8] text-[22px]">□</button>
          <button className="h-[54px] w-[54px] border-none bg-transparent transition ease-out duration-100 text-white mb-[18px] hover:bg-[#ff3434] text-[22px]">✕</button>
        </div>
      </div>
      
      {/* Browser Header */}
      <div className="absolute top-[54px] w-full h-[72px] bg-[#515151] p-[13px] flex gap-[9px] rounded-tl-[13px] rounded-tr-[13px]">
        <button className="w-[49px] h-[45px] border-none bg-transparent text-white rounded-full transition ease-in-out duration-200 hover:bg-[#5d5d5d] text-[22px]">←</button>
        <button disabled className="w-[49px] h-[45px] border-none bg-transparent text-white rounded-full transition ease-in-out duration-200 opacity-40 hover:bg-transparent text-[22px]">→</button>
        <input 
          type="text" 
          placeholder="Search Google or type URL" 
          value="Skygen.ai"
          readOnly
          className="bg-[#3b3b3b] text-[25px] border-2 border-transparent h-full rounded-full outline-none text-white px-[27px] flex-1 transition ease-in-out duration-200 hover:bg-[#5d5d5d] focus:border-[#add6ff] focus:bg-[#3b3b3b] focus:transition-none placeholder-white"
        />
        <button className="w-[49px] h-[45px] border-none bg-transparent text-white rounded-full transition ease-in-out duration-200 hover:bg-[#5d5d5d] text-[22px]">⋮</button>
        <button className="text-white absolute right-[81px] top-1/2 -translate-y-1/2 text-[27px] opacity-70 h-[32px] w-[34px] flex items-center justify-center pb-[5px]">✰</button>
      </div>
    </div>
  );
};

export {Browser};