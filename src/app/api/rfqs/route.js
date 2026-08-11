import rfqList from "../../../../public/mock/rfq-list.json";

export async function GET() {
  return Response.json(rfqList);
}
