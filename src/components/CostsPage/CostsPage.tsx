import { useStore } from "effector-react"
import { useEffect, useRef, useState } from "react"
import { getCostFx } from "../../api/costsClient"
import { $costs, setCosts } from "../../context"
import { getAuthDataFromLS } from "../../utils/Auth"
import { Spinner } from "../Spinner/Spinner"
import { Header } from "./Header/Header"

export const CostsPage = () => {
  const [spinner, setSpinner] = useState(false);
  const store = useStore($costs);
  const shouldLoadCosts = useRef(true)

  useEffect(() => {
    if (shouldLoadCosts.current) {
      shouldLoadCosts.current = false;
      handleGetCosts();
      console.log(store);
    }
  }, [])

  const handleGetCosts = async () => {
    setSpinner(true);
    const authData = getAuthDataFromLS();
    const costs = await getCostFx({
      url: '/cost',
      token: authData.access_token
    })
    setSpinner(false);
    setCosts(costs)
  }
  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Учет моих расходов</h2>
      <Header costs={[]} />
      <div style={{ position: 'relative' }}>
        {spinner && <Spinner top={0} left={0} />}
      </div>
    </div>
  )
}