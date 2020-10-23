import jwt, { VerifyErrors } from "jsonwebtoken";
import { ILoginData } from "./createJWToken";
import { IUser } from "models/User";

export interface DecodedData {
  data: ILoginData;
}

export const verifyJWTToken = (token: string): Promise<DecodedData | null> =>
  new Promise(
    (
      resolve: (decodedData: DecodedData) => void,
      reject: (err: VerifyErrors) => void
    ) => {
      jwt.verify(token, process.env.JWT_SECRET || "123", (err, decodedData) => {
        if (err || !decodedData) {
          return reject(err!);
        }

        resolve(decodedData as DecodedData);
      });
    }
  );
