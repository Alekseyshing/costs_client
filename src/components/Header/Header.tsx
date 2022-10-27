import { useTheme } from "../../hooks/index"

export const Header = () => {
  const { switchTheme, theme } = useTheme()
  return (
    <header className={`navbar navbar-dark bg-${theme === 'dark' ? 'dark' : 'primary'}`}>
      <div className="container" style={{ color: 'white' }}>Costs App</div>
      <button
        onClick={switchTheme}
        className={`btn btn-${theme === 'dark' ? 'dark' : 'light'}`}
      >
        {theme === 'dark' ? 'Go light' : 'Go dark'}
      </button>
    </header>
  )
}