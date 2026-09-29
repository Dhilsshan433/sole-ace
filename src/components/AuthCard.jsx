import Logo from './Logo'

export default function AuthCard({ title, subtitle, children, icon }) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-stone-line bg-white p-10">
      <div className="mb-5 flex justify-center">{icon || <Logo />}</div>
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      {subtitle && <p className="mt-2 text-center text-sm text-muted">{subtitle}</p>}
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  )
}