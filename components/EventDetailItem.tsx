import Image from "next/image";

interface EventDetailProps {
  icon: string;
  alt: string;
  label: string;
}

const EventDetailItem = ( {icon, alt, label }: EventDetailProps ) => {
  return (
    <div className="flex-row-gap-2 items-center">
      <Image src={icon} alt={alt} width={17} height={17}/>
      <p>{label}</p>
    </div>
  )
}

export default EventDetailItem