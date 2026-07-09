function MessagesLoadingSkeleton() {
  return (
    <div className="`w-full px-10">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"} animate-pulse`}
        >
          <div className={`chat-bubble rounded-2xl h-10 bg-slate-800 text-white w-32`}></div>
        </div>
      ))}
    </div>
  );
}
export default MessagesLoadingSkeleton;
