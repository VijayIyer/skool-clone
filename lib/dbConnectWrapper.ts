import { dbConnect } from "./mongoClient";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { responseFormatter } from "./responseLib";
export const dbConnectWrapper = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await dbConnect();
      handler(req, res);
    } catch (e) {
      console.log("fail to connect with database", e);
      return res
        .status(500)

        .json(responseFormatter(false, null, "Internal Server Error"));
    }
  };
};
