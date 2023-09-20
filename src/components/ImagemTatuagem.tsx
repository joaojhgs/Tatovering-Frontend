'use client';

export default function ImagemTatuagem(url: string) {
  return (
    <div>
      <div className="bg-black h-52 w-80 rounded-md">
        <img src={url} alt="" />
      </div>
    </div>
  );
}
