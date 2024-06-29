

export default function Alert() {
    return (
        <div className="flex w-[20%] flex-col gap-3 items-center justify-center p-3 bg-white rounded-[6px] shadow-md border border-zinc-200 z-[100] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img alt="some error hapenned, warning icon" src="/image/warning.png" width={50} height={50} />
            <p className="text-zinc-800 font-mono text-[14px]">Something happenned...</p>
        </div>
    )
}