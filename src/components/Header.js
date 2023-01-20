import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({title, toggleShowTaskForm, showTaskForm}) => {

  const location = useLocation()

    const onClick = () =>{
      toggleShowTaskForm()
    }

  return (
    <header className='header'>
    <h1>{title}</h1>
    {location.pathname === '/' && <Button color={showTaskForm ? 'orangered' : 'green'} text={showTaskForm ? 'Close' : 'Add'} onClick={onClick} />
     }
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header