import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
	// set img data
	const [img, setImg] = useState({});
	// create a toggle for for submit button
	const [imgToggle, setImgToggle] = useState(false);

	// use ref to display image and change img
	const uploadedImage = useRef(null);
	const imageUpLoader = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`http://localhost:4000/img`);
			setImg(result.data);
		};
		fetchData();
	}, []);
	function imgClick() {
		imageUpLoader.current.click();
	}
	function handleChange(e) {
		// once the image changes switch toggle to true
		setImgToggle(true);
		// set up file reader to display img
		const [file] = e.target.files;
		if (file) {
			const reader = new FileReader();
			const { current } = uploadedImage;
			current.file = file;
			reader.onload = (e) => {
				current.src = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	}
	function handleSubmit(e) {
		e.preventDefault();
	}
	return (
		<div className="App">
			<form encType="multipart/form-data" onSubmit={handleSubmit}>
				<input
					type="file"
					name="avatars"
					onChange={handleChange}
					ref={imageUpLoader}
					style={{ display: "none" }}
				/>

				<img
					src={`http://localhost:4000/static/${img.path && img.path.slice(7)}`}
					ref={uploadedImage}
					alt={img.originalname}
					onClick={imgClick}
				/>
				{imgToggle ? (
					<>
						<button type="submit">Upload</button>
					</>
				) : (
					""
				)}
			</form>
		</div>
	);
}

export default App;
