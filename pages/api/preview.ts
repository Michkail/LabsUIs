import { validatePreview, getDynamicPageURL } from "@agility/nextjs/node";
import { NextApiRequest, NextApiResponse } from "next"

const apiCall = async (req: NextApiRequest, res: NextApiResponse) => {

	const validationResp = await validatePreview({
		agilityPreviewKey: req.query.agilitypreviewkey,
		slug: req.query.slug
	});

	if (validationResp.error) {
		return res.status(401).end(`${validationResp.message}`)
	}

	let previewUrl = req.query.slug;

	if (req.query.ContentID) {
		const dynamicPath = await getDynamicPageURL({ contentID: req.query.ContentID, preview: true, slug: req.query.slug });
		if (dynamicPath) {
			previewUrl = dynamicPath;
		}
	}

	res.setPreviewData({})

	let url = `${previewUrl}`
	if (url.includes("?")) {
		url = `${url}&preview=1`
	} else {
		url = `${url}?preview=1`
	}

	res.writeHead(307, { Location: url })
	res.end()

}

export default apiCall