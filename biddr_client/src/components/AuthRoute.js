import { Navigate } from "react-router-dom"

const AuthRoute = ({isAllowed, component}) => {
  if (isAllowed) {
    return component
  } else {
    return <Navigate to="/sign_in" replace={true}/>
  }
}

export default AuthRoute