import { generatePreviewKey } from "@agility/nextjs/node";

import { NextApiRequest, NextApiResponse } from "next"

const apiCall = async (req: NextApiRequest, res: NextApiResponse) => {
	const previewKey = generatePreviewKey();

	res.end(previewKey);
};

export default apiCall