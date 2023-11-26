
interface PositionIndicatorProps {
    position: number;
};

const PositionIndicator: React.FC<PositionIndicatorProps> = ({ position }) => {
    // Function to determine the color based on the position
    const getColor = (pos: number): string => {
        switch (pos) {
            case 1: return 'bg-yellow-400 text-white'; // Assuming you have custom classes like bg-gold, bg-silver, etc.
            case 2: return 'bg-slate-500 text-white';
            case 3: return 'bg-orange-800 text-white';
            default: return 'bg-gray-200'; // Default color for positions other than 1, 2, 3
        }
    };

    return (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getColor(position)}`}>
            <span className="font-semibold">{position}</span>
        </div>
    );
};

export function RecentContests() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <PositionIndicator position={4} />
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Contest on 25th Nov
                    </p>
                    <p className="text-sm text-muted-foreground">
                        with @jacksonlee, @isabellanguyen,...
                    </p>
                </div>
            </div>
            <div className="flex items-center">
                <PositionIndicator position={3} />
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Contest on 23rd Nov
                    </p>
                    <p className="text-sm text-muted-foreground">
                        with @sofiadavis, @williamkim,...
                    </p>
                </div>
            </div>
            <div className="flex items-center">
                <PositionIndicator position={1} />
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Contest on 20th Nov
                    </p>
                    <p className="text-sm text-muted-foreground">
                        with @isabellanguyen, @jacksonlee,...
                    </p>
                </div>
            </div>
            <div className="flex items-center">
                <PositionIndicator position={6} />
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Contest on 19th Nov
                    </p>
                    <p className="text-sm text-muted-foreground">
                        with @williamkim, @sofiadavis,...
                    </p>
                </div>
            </div>
            <div className="flex items-center">
                <PositionIndicator position={2} />
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Contest on 18th Nov
                    </p>
                    <p className="text-sm text-muted-foreground">
                        with @jacksonlee, @isabellanguyen,...
                    </p>
                </div>
            </div>
        </div>
    );
}
