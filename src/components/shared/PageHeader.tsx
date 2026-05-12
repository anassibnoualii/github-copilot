interface PageHeaderProps {
  badge: string
  title: string
  desc: string
}

export default function PageHeader({ badge, title, desc }: PageHeaderProps) {
  return (
    <div className="module-header">
      <div className="meta"><span className="badge badge-purple">{badge}</span></div>
      <h1>{title}</h1>
      <p className="desc">{desc}</p>
    </div>
  )
}
