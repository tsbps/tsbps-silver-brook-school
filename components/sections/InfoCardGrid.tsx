interface InfoCardItem {
  title: string;
  description: string;
  badge?: string;
}

export default function InfoCardGrid({
  items,
  columns = 3,
  cardClassName = "",
}: {
  items: InfoCardItem[];
  columns?: 2 | 3;
  cardClassName?: string;
}) {
  return (
    <div className={`grid ${columns === 2 ? "grid-2" : "grid-3"}`}>
      {items.map((item) => (
        <article className={`card info-card ${cardClassName}`.trim()} key={item.title}>
          {item.badge ? (
            <span className="icon-badge" aria-hidden="true">
              {item.badge}
            </span>
          ) : null}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}
