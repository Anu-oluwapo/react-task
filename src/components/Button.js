import PropTypes from 'prop-types'
function Button({color, text, onClick}) {
  return (
    <button onClick={onClick} style={{backgroundColor:color}} className='btn'>{text}</button>
  )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired
}
export default Button