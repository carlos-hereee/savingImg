const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { v1 } = require("uuid");

const Image = require("./model");

// creates the path of the images and changes file name to avoid same name err
const storage = multer.diskStorage({
	destination: "./public/uploads",
	filename: function (req, file, cb) {
		const newFilename = `${v1()}-${file.originalname}`;
		cb(null, newFilename);
	},
});

// saves image in storage
// with single() name MUST be the name used in the form name field
const upload = multer({
	storage: storage,
	// create file filters
	limits: { fileSize: 10000000 },
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
}).single("avatars");

// creates file checks
function checkFileType(file, cb) {
	// Allowed ext
	const fileTypes = /jpeg|jpg|png|gif/;
	// check ext
	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
	// check mime
	const mimetype = fileTypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb("Error: images only");
	}
}

router.get("/", async (req, res) => {
	const imgId = 1;
	try {
		const data = await Image.getImg(imgId);
		res.status(202).json(data);
	} catch (e) {
		console.log("e", e);
		res.status(404).json({ message: "Error: could not find image", e: e });
	}
});
router.put("/:imgId", async (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			console.log("err", err);
			res.status(400).send({ message: err });
		} else {
			if (req.file === undefined) {
				res.status(406).send({ message: "Error: No File Selected" });
			} else {
				const data = {
					originalname: req.file.originalname,
					filename: req.file.filename,
					mimetype: req.file.mimetype,
					path: req.file.path,
					size: req.file.size,
				};
				Image.saveImg(req.params.imgId, data)
					.then((response) => {
						res.status(201).json(response);
					})
					.catch((e) => {
						res.status(500).json({
							message: "An Error Occured with saving the image",
							error: e,
						});
					});
			}
		}
	});
});
module.exports = router;
