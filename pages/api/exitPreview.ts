import { NextApiRequest, NextApiResponse } from "next"

const apiCall = async (req: NextApiRequest, res: NextApiResponse) => {
	res.clearPreviewData()

	res.writeHead(307, { Location: `${req.query.slug}?preview=0` })
	res.end()
}

export default apiCall