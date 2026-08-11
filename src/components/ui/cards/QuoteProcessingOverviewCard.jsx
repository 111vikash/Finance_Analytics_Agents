export default function QuoteProcessingOverviewCard( { value, title, rightTitle, rightValue } ) {
    return(    
        <div className={`bg-[#F4E9FF] rounded-lg px-6 py-4 mb-2 mt-1 flex items-center justify-between`}>
            {/* Left section */}
            <div>
                <p className="text-[14px] text-[#4A5565] mb-2">{title}</p>
                <h3>{value}</h3>
            </div>
            {/* Right section */}
            <div>
                <p className="text-[14px] text-[#4A5565] mb-2">{rightTitle}</p>
                <h3 className="text-right">{rightValue}</h3>
            </div>
        </div>
    )
}