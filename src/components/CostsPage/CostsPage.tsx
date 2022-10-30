import { Header } from "./Header/Header"

export const CostsPage = () => {
  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Учет моих расходов</h2>
      <Header costs={[]} />
    </div>
  )
}