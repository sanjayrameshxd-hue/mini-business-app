function Card({ children }) {
  return (
    <div className="rounded-[30px] border border-green-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {children}
    </div>
  );
}

export default Card;