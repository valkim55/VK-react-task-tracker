import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({title, onAdd, showAdd}) => {

    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {/* embedding a button component and adding onClick prop that's calling the onClick function.
            There are other events you can add: onDoubleClick, onSubmit etc. */}
            {location.pathname === '/' && <Button 
                color={showAdd ? 'red' : 'green'} 
                text={showAdd ? 'Close' : 'Add'} 
                onClick={onAdd} 
            />}
        </header>
    )
}

Header.defaultProps = {
    title: "Potato's Task Tracker",

}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// one of the ways to use style with React - bring the style into JS by adding 'style' into the JSX element
// so for this headingStyle you'd add to <h1 style={headingStyle}> {title} </h1>
// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'black'
// }

export default Header 