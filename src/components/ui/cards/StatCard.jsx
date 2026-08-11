import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard( { value, title, color, isUp, percentage } ) {
    return(
        <div className={`border rounded-lg p-3 bg-white shadow flex flex-col`} style={{ borderColor: color }}>
            <span className={`text-xxs md:text-xxs lg:text-xxs xl:text-xxs 2xl:text-sm font-semibold`} style={{ color }}>
                {title}
            </span>
            <span className="text-base 2xl:text-lg font-bold text-primary-grey">
                {value}
            </span>
            <span className={`text-[12px] mt-4 flex items-center ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                {isUp ? (
                    <TrendingUp height={14} width={14} className="mr-2"/>
                ) : (
                    <TrendingDown height={14} width={14} className="mr-2"/>
                )}
                {percentage} from last week
            </span>
        </div>
    )
}