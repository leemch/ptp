import React from 'react';

const SearchBox = ({searchfield, searchChange}) =>{

	return(
		<div className="input-group mb-3">
			<div className='input-group-prepend'>
				<span className="input-group-text" id="basic-addon1">Search: </span>
			</div>

			<input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
		</div>


		);
}

export default SearchBox;