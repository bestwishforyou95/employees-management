import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

// type Data = {
//   name: string;
// };

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  fs.readFile('pages/api/employees/API_GET_Employees.json', (err, data: any) => {
    if (err) {
      res.status(500).json('Internal Server Error');
      return;
    }
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData.Response);
  });
}
