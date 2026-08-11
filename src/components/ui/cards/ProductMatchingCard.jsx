import { TrendingUp, CircleCheck } from "lucide-react";

export default function ProductMatchingCard( { data } ) {
    return (
        <div className="border border-green-300 rounded-lg p-4 bg-green-50 mt-2">
        {/* Header */}
        <div className="mb-3">
            <div className="text-sm text-[#364153]">{data.itemLabel}</div>
            <div className="text-sm text-[#364153] mt-1">
            {data.title}
            </div>
        </div>

        {/* Inner Card */}
        <div className="border border-green-400 rounded-lg p-4 bg-white">
            {/* Top Row */}
            <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-green-700 text-sm font-semibold">
                <CircleCheck className="h-5"/>
                MATCHED
            </div>

            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {data.stockStatus}
            </span>
            </div>

            {/* Product description */}
            <div className="text-sm font-medium text-gray-800">
            {data.productName}
            </div>

            <div className="text-xs text-gray-500 mt-1">
            SKU: {data.sku}
            </div>

            {/* Divider */}
            <div className="border-t my-3"></div>

            {/* Info Grid */}
            <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
                <div className="text-gray-400 text-xs">Requested</div>
                <div className="font-semibold text-gray-700">
                {data.requested}
                </div>
            </div>

            <div>
                <div className="text-gray-400 text-xs">In Stock Quantity</div>
                <div className="font-semibold text-green-600">
                {data.inStock}
                </div>
            </div>

            <div>
                <div className="text-gray-400 text-xs">Lead Time</div>
                <div className="font-semibold text-gray-700">
                {data.leadTime}
                </div>
            </div>

            <div>
                <div className="text-gray-400 text-xs">UOM</div>
                <div className="font-semibold text-gray-700">
                {data.uom}
                </div>
            </div>
            </div>

            {/* AI Score */}
            <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>AI Score:</span>
                <span className="text-green-600 font-medium">
                {data.aiScore}%
                </span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                className="h-2 bg-green-600 rounded-full"
                style={{ width: `${data.aiScore}%` }}
                />
            </div>
            </div>
        </div>
        </div>
    );
}