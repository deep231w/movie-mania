type MovieCardProps = {
  image?: string;
};

export default function MovieCard({ image }: MovieCardProps) {
  return (
    <div
      className="h-70 w-52 flex-shrink-0 rounded-xl bg-cover bg-center transition-transform duration-300 hover:scale-105"
      style={{
        backgroundImage: `url(${image})`,
      }}
    />
  );
}