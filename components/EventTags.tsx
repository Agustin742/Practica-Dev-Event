
const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-2 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
  )
}

export default EventTags