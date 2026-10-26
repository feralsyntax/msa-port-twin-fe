import './PlaceholderPage.scss';
type PlaceholderPageProps = {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <p className="placeholder-page">
      {title} page content renders here
    </p>
  )
}