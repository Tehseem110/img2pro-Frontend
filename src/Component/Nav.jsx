import React, { useState } from "react";
import white from '../assets/imbWhite.png'
import black from '../assets/img.png'
import light from '../assets/light-mod.png'

const Nav = ({ handleMode, theme,setClick }) => {

	const [clickCount, setClickCount] = useState(0);

	const handleClick = () => {
	  // Increment the click count on each click
	  setClickCount((prevClickCount) => prevClickCount + 1);
  
	  // Your logic for handling the click goes here
	  if (clickCount === 2) {
		// This will be executed on the third click (zero-based index)
		setClick(true)
		setTimeout(() => {
			setClick(false)
		}, 3000);
		// Reset the click count
		setClickCount(0);
	  }
	};
	return (
		<nav>
			<div className='dark:backdrop-blur-sm bg-black/30 dark:bg-[#a79df540] flex justify-between text-white  dark:text-white '>
				<div className='my-1   p-2 '>
					<button onClick={handleMode}>
						{theme === 'dark' ? (
							<i className='fa-regular fa-sun '></i>
						) : (
							<i className='fa-solid fa-moon'></i>
						)}
					</button>
				</div>
	
				<div className='w-[10rem] h-full' onClick={handleClick}>
				<img src={theme === 'dark' ? light : black}/>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
