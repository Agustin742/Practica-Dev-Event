
const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-2 flex-wrap">
        {tags.map((tag, index) => (
            <div className="pill" key={index}>{tag}</div>
        ))}
    </div>
  )
}

export default EventTags